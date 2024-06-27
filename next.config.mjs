/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        unoptimized: true,  /*  remove this in live server */
        remotePatterns: [
            {
                hostname: "atlanticlubes.com",
                protocol: "https", 
            },
            {
                hostname: "admin.atlanticlubes.com",
                protocol: "https", 
            },
            {
                hostname: "localhost",
                protocol: "http", 
            }
        ],
    },
    

};

export default nextConfig;

