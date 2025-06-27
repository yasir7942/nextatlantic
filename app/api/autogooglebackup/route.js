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
    keyFile: path.join(process.cwd(), 'gdrive-key.json'), // Path to your Google service account key
    scopes: ['https://www.googleapis.com/auth/drive']
});

async function uploadToDrive(filePath, fileName, folderId) {
    const auth = await driveAuth.getClient();
    const drive = google.drive({ version: 'v3', auth });


    const fileMetadata = {
        name: fileName,
        parents: [folderId],
    };

    const media = {
        mimeType: 'application/zip',
        body: fs.createReadStream(filePath),
    };

    const res = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'id',
    });

    return res.data.id;
}

async function cleanOldDriveBackups(folderId) {
    const auth = await driveAuth.getClient();
    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.list({
        q: `'${folderId}' in parents and mimeType='application/zip'`,
        orderBy: 'createdTime desc',
        fields: 'files(id, name, createdTime)',
    });

    const files = response.data.files;
    if (files.length > totalbackups) {
        const oldFiles = files.slice(totalbackups);
        for (const file of oldFiles) {
            await drive.files.delete({ fileId: file.id });
        }
    }
}

export async function GET(req) {
    const VALID_TOKEN = process.env.ADMIN_TOKEN;

    try {
        const url = new URL(req.url, `http://${req.headers.get('host')}`);
        const token = url.searchParams.get("token");

        if (!token || token !== VALID_TOKEN) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Unauthorized: Invalid token',
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASS;
        const dbName = process.env.DB_NAME;
        const gdriveFolderId = process.env.GDRIVE_FOLDER_ID;

        const backupDir = path.join(process.cwd(), 'backups');
        const logFile = path.join(backupDir, 'backup.log');

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const sqlFile = path.join(backupDir, `backup-${timestamp}.sql`);
        const zipFile = sqlFile.replace('.sql', '.zip');

        let dumpCommand;
        if (!dbPassword) {
            dumpCommand = `mysqldump -u ${dbUser} ${dbName} > "${sqlFile}"`;
        } else {
            dumpCommand = `mysqldump -u ${dbUser} -p${dbPassword} ${dbName} > "${sqlFile}"`;
        }

        return new Promise((resolve) => {
            exec(dumpCommand, async (err, stdout, stderr) => {
                const logMessage = `[${new Date().toLocaleString()}] `;

                if (err) {
                    fs.appendFileSync(logFile, `${logMessage}❌ Backup failed: ${err.message}\n`);
                    resolve(new Response(JSON.stringify({
                        success: false,
                        message: 'Backup failed',
                        error: err.message,
                    }), {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                    return;
                }

                if (stderr) {
                    fs.appendFileSync(logFile, `${logMessage}⚠️ Warning: ${stderr}\n`);
                }

                try {
                    const source = fs.createReadStream(sqlFile);
                    const destination = fs.createWriteStream(zipFile);
                    const gzip = createGzip();

                    await pipe(source, gzip, destination);
                    fs.unlinkSync(sqlFile);

                    fs.appendFileSync(logFile, `${logMessage}✅ Backup created & zipped: ${zipFile}\n`);

                    // Upload to Google Drive
                    const fileId = await uploadToDrive(zipFile, path.basename(zipFile), gdriveFolderId);
                    fs.appendFileSync(logFile, `${logMessage}☁️ Uploaded to Google Drive: ${fileId}\n`);

                    await cleanOldDriveBackups(gdriveFolderId);

                    const allFiles = fs.readdirSync(backupDir)
                        .filter(f => f.endsWith('.zip'))
                        .map(f => ({
                            name: f,
                            time: fs.statSync(path.join(backupDir, f)).mtime.getTime()
                        }))
                        .sort((a, b) => b.time - a.time);

                    const oldBackups = allFiles.slice(totalbackups);
                    oldBackups.forEach(file => {
                        const filePath = path.join(backupDir, file.name);
                        fs.unlinkSync(filePath);
                        fs.appendFileSync(logFile, `${logMessage}🗑️ Deleted old local backup: ${file.name}\n`);
                    });

                    resolve(new Response(JSON.stringify({
                        success: true,
                        message: 'Backup and Google Drive upload successful',
                        file: zipFile,
                    }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    }));

                } catch (zipError) {
                    fs.appendFileSync(logFile, `${logMessage}❌ Zip or Drive upload failed: ${zipError.message}\n`);
                    resolve(new Response(JSON.stringify({
                        success: false,
                        message: 'Backup created but zip/upload failed',
                        error: zipError.message,
                    }), {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                }
            });
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Unexpected error',
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
