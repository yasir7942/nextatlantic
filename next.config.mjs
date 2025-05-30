/** @type {import('next').NextConfig} */




let unOptimized = true;
let fileRoutes = true;

if (process.env.MODE === "pro") {
    unOptimized = false;
    fileRoutes = false;
}





const nextConfig = {

    reactStrictMode: true,

    // useFileSystemPublicRoutes: fileRoutes,
    trailingSlash: true,


    images: {
        unoptimized: unOptimized,   //false in in live server make webp images 
        remotePatterns: [
            {
                hostname: "front.atlanticlubes.ca",
                protocol: "https",
            },
            {
                hostname: "atlanticlubes.ca",
                protocol: "https",
            },
            {
                hostname: "admin.atlanticlubes.ca",
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

