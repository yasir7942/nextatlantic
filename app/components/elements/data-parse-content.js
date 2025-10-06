"use client"

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";



// Replace domain in image URLs
const replaceImageDomain = (content) => {
   if (!Array.isArray(content)) return [];

   return content.map((block) => {
      if (block.type === "image" && block.image?.url) {
         const oldUrl = block.image.url;

         // Replace only if the URL contains atlanticlubes.ca
         if (oldUrl.includes("atlanticlubes.ca")) {
            const newUrl = oldUrl.replace("atlanticlubes.ca", "atlanticlubes.com");
            return {
               ...block,
               image: {
                  ...block.image,
                  url: newUrl,
               },
            };
         }
      }

      // Return unchanged block if not an image or no match
      return block;
   });
};




const BodyDataParse = ({ content }) => {

   //data parse of  rich-text 

   if (!content) return null;

   const updatedContent = replaceImageDomain(content);

   return <BlocksRenderer content={updatedContent} blocks={{
      image: ({ image }) => {
         //console.log(image);
         return (
            <Image className="object-cover object-center my-3 w-full" quality={100} src={image.url} width={image.width} height={image.height}
               alt={image.alternativeText || ""} />
         )
      }
   }} />


}

export default BodyDataParse





