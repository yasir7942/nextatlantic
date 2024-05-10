/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                hostname: "atlanticlubes.com",
                protocol: "https", 
            },
        ],
    }

};

export default nextConfig;

