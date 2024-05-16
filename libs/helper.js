//import { flattenAttributes } from "@/libs/utils";

/*

export const  getReadingTime = (text)=> {

    return  (text).text;

}

*/

export async function getStrapiData(path, filter,  populateList =[] ){
    
   let  baseUrl =process.env.LOCAL_BASE_URL +  path + filter ;
   let isFirstIteration = true;
   if(filter != "")
    {
      isFirstIteration = false;
    }
    if(populateList.length > 0){
         populateList.forEach(function(element) {
                     
                    if (isFirstIteration) {
                       baseUrl += "?populate=" +element
                      isFirstIteration = false; // Update to false after the first iteration
                  }
                  else{
                    baseUrl += "&populate=" +element
                  }
                    
                });
    }
    else
    {
        baseUrl = process.env.LOCAL_BASE_URL +  path;
    }
    
 
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log(baseUrl);
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
  
     
      try {
        const response = await fetch(baseUrl  , {cache: "no-cache"});
        const data = await response.json();
         //const flattenedData = flattenAttributes(data);


         

         //return flattenedData;
       
 
        return data.data;
              
      } catch (error) {
         console.log(error);
      }
   }

   