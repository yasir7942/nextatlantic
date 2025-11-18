module.exports = {
    apps: [{
        name: "AGL-PK-NextJS",
        script: "node_modules/next/dist/bin/next",
        args: "start -p 3000",
        cwd: "/var/www/vhosts/atlanticlubes.com/httpdocs",
        env: {
            NODE_ENV: "production"
        },

        // Robustness
        autorestart: true,
        exp_backoff_restart_delay: 2000, // exponential backoff (ms)
        max_restarts: 20,
        max_memory_restart: "1G",        // restart if memory leaks

        // Zero-downtime reloads
        exec_mode: "cluster",
        instances: "max",                 // or a fixed number like 2

        // Optional (your paths)
        out_file: "/var/log/pm2/next-app.out.log",
        error_file: "/var/log/pm2/next-app.err.log",
        log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    }]
};


// npx pm2 start ecosystem.config.js
//npx pm2 save


//pm2 scale AGL-PK-NextJS 2   # or "max" to use all cores
//pm2 reload AGL-PK-NextJS