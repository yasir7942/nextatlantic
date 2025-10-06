import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { google } from 'googleapis';

const totalbackups = 15;
const pipe = promisify(pipeline);

const driveAuth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'gdrive-key.json'),
    scopes: ['https://www.googleapis.com/auth/drive']
});

async function uploadToDrive(filePath, fileName, driveId) {
    const auth = await driveAuth.getClient();
    const drive = google.drive({ version: 'v3', auth });

    const res = await drive.files.create({
        requestBody: { name: fileName, parents: [driveId] },
        media: { mimeType: 'application/zip', body: fs.createReadStream(filePath) },
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        driveId,
        fields: 'id'
    });

    return res.data.id;
}

async function cleanOldDriveBackups(driveId) {
    const auth = await driveAuth.getClient();
    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.list({
        q: `mimeType='application/zip' and '${driveId}' in parents`,
        corpora: 'drive',
        driveId,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        orderBy: 'createdTime desc',
        fields: 'files(id, name, createdTime)'
    });

    const files = response.data.files || [];
    if (files.length > totalbackups) {
        for (const f of files.slice(totalbackups)) {
            await drive.files.delete({ fileId: f.id, supportsAllDrives: true });
        }
    }
}

export async function GET(req) {
    const VALID_TOKEN = process.env.ADMIN_TOKEN;
    try {
        const url = new URL(req.url, `http://${req.headers.get('host')}`);
        const token = url.searchParams.get('token');
        if (!token || token !== VALID_TOKEN) {
            return new Response(
                JSON.stringify({ success: false, error: 'Unauthorized: Invalid token' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASS;
        const dbName = process.env.DB_NAME;
        const gdriveFolder = process.env.GDRIVE_FOLDER_ID;

        const backupDir = path.join(process.cwd(), 'backups');
        const logFile = path.join(backupDir, 'backup.log');
        if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        // ← Updated here to add "AGL-" prefix:
        const baseName = `AGL-backup-${timestamp}`;
        const sqlFile = path.join(backupDir, `${baseName}.sql`);
        const zipFile = path.join(backupDir, `${baseName}.zip`);

        const dumpCommand = !dbPassword
            ? `mysqldump -u ${dbUser} ${dbName} > "${sqlFile}"`
            : `mysqldump -u ${dbUser} -p${dbPassword} ${dbName} > "${sqlFile}"`;

        return new Promise(resolve => {
            exec(dumpCommand, async (err, _stdout, stderr) => {
                const logMessage = `[${new Date().toLocaleString()}] `;
                if (err) {
                    fs.appendFileSync(logFile, `${logMessage}❌ Backup failed: ${err.message}\n`);
                    return resolve(new Response(
                        JSON.stringify({ success: false, message: 'Backup failed', error: err.message }),
                        { status: 500, headers: { 'Content-Type': 'application/json' } }
                    ));
                }
                if (stderr) fs.appendFileSync(logFile, `${logMessage}⚠️ Warning: ${stderr}\n`);

                try {
                    // Zip it
                    await pipe(
                        fs.createReadStream(sqlFile),
                        createGzip(),
                        fs.createWriteStream(zipFile)
                    );
                    fs.unlinkSync(sqlFile);
                    fs.appendFileSync(logFile, `${logMessage}✅ Backup zipped: ${zipFile}\n`);

                    // Upload & clean Drive
                    const driveId = await uploadToDrive(zipFile, path.basename(zipFile), gdriveFolder);
                    fs.appendFileSync(logFile, `${logMessage}☁️ Uploaded to Shared Drive: ${driveId}\n`);
                    await cleanOldDriveBackups(gdriveFolder);

                    // Rotate local zips
                    const localZips = fs.readdirSync(backupDir)
                        .filter(f => f.endsWith('.zip'))
                        .map(f => ({ name: f, time: fs.statSync(path.join(backupDir, f)).mtime.getTime() }))
                        .sort((a, b) => b.time - a.time);
                    for (const old of localZips.slice(totalbackups)) {
                        fs.unlinkSync(path.join(backupDir, old.name));
                        fs.appendFileSync(logFile, `${logMessage}🗑️ Deleted old local backup: ${old.name}\n`);
                    }

                    resolve(new Response(
                        JSON.stringify({ success: true, message: 'Backup + upload successful', file: zipFile }),
                        { status: 200, headers: { 'Content-Type': 'application/json' } }
                    ));
                } catch (zipErr) {
                    fs.appendFileSync(logFile, `${logMessage}❌ Zip/upload failed: ${zipErr.message}\n`);
                    resolve(new Response(
                        JSON.stringify({ success: false, message: 'Backup created but zip/upload failed', error: zipErr.message }),
                        { status: 500, headers: { 'Content-Type': 'application/json' } }
                    ));
                }
            });
        });
    } catch (e) {
        return new Response(
            JSON.stringify({ success: false, message: 'Unexpected error', error: e.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
