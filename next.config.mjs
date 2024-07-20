/** @type {import('next').NextConfig} */

import fetchRedirects from './libs/fetch-redirects.mjs';

 
//const redirectionRules = require('../app/data/redirection-rules.json');


  
const getRedirects = async () => {
    const redirectsData = await fetchRedirects(); // Access the function via the imported module object
     
   /* return redirectsData.map((redirect) => ({
        source: redirect.source,
        destination: redirect.destination,
        permanent: true,
    }));  */

    return redirectsData;
};



const unOptimized = true;
if(process.env.MODE === "pro")
    {
        unOptimized =false;
    }

const nextConfig = {
      



    images: {
        unoptimized: unOptimized,  /* false in in live server make webp images*/
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

    async redirects() {
        return await getRedirects();
    },
    

};

export default nextConfig;

