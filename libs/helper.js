import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Replace } from "lucide-react";
import Image from "next/image";


export const  getImageUrl = (path)=> {
 if( process.env.NEXT_PUBLIC_MODE == "dev" ){
   return process.env.NEXT_PUBLIC_LOCAL_BASE_IMAGE_URL + path;
 }
   else{
      return process.env.NEXT_PUBLIC_ADMIN_BASE_URL +path;
   }
}


export const  getFirstDescriptionText=(descriptionArray) => {
  if (descriptionArray.length === 0) return "";
  return (descriptionArray[0].children.map(child => child.text).join('')).slice(0, 160);
}


export const validateCanonicalSlug = (link) => {
  if (!link || link === null || link === "") return "";

  let ConLink = link;
  if (!ConLink.startsWith('/')) {
    ConLink = '/' + ConLink;
  }
  if (!ConLink.endsWith('/')) {
    ConLink = ConLink + '/';
  }

  return ConLink;
}

   