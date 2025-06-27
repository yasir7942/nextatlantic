import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipe = promisify(pipeline);

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
        const totalbackups = 15;

        const backupDir = path.join(process.cwd(), 'backups');
        const logFile = path.join(backupDir, 'backup.log');

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const sqlFile = path.join(backupDir, `backup-${timestamp}.sql`);
        const zipFile = sqlFile.replace('.sql', '.zip');

        // Create dump command
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
                    // Compress SQL file into .zip
                    const source = fs.createReadStream(sqlFile);
                    const destination = fs.createWriteStream(zipFile);
                    const gzip = createGzip();

                    await pipe(source, gzip, destination);

                    // Delete original .sql file
                    fs.unlinkSync(sqlFile);

                    fs.appendFileSync(logFile, `${logMessage}✅ Backup created & zipped: ${zipFile}\n`);

                    // Keep only latest (const totalbackups) 15 backups (.zip files)
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
                        fs.appendFileSync(logFile, `${logMessage}🗑️ Deleted old backup: ${file.name}\n`);
                    });

                    resolve(new Response(JSON.stringify({
                        success: true,
                        message: 'Backup and zip successful',
                        file: zipFile,
                    }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    }));

                } catch (zipError) {
                    fs.appendFileSync(logFile, `${logMessage}❌ Zip failed: ${zipError.message}\n`);
                    resolve(new Response(JSON.stringify({
                        success: false,
                        message: 'Backup created but zip failed',
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
