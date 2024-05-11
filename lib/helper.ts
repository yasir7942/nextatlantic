import { flattenAttributes } from "@/lib/utils";

/*

export const  getReadingTime = (text)=> {

    return  (text).text;

}

*/

export async function getStrapiData(path,deep=false){
    
   var  baseUrl ="";
    if(deep){
         baseUrl = process.env.API_BASE_URL +  path + "?populate=*";
    }
    else
    {
        baseUrl = process.env.API_BASE_URL +  path;
    }
     
      try {
        const response = await fetch(baseUrl  , {cache: "no-cache"});
        const data = await response.json();
        const flattenedData = flattenAttributes(data);
        return flattenedData;
      
              
      } catch (error) {
         console.log(error);
      }
   }