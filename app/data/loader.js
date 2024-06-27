import { flattenAttributes } from "@/libs/data-utils";
import qs from 'qs';

let  baseUrl =process.env.NEXT_PUBLIC_API_BASE_URL;
let  appMode = process.env.NEXT_PUBLIC_MODE;
let cacheSystem = "";
  if(appMode == "dev")
    {
      cacheSystem = "no-cache";
    }

   
   export async function fetchData(path, filter){

    const authToken =null;
    const headers =
    {
      method:"GET",
      header:{
      "Content-Type":"application-json",
      cache: cacheSystem,
      Authorization:`Bearer ${authToken}`,}

    }
     
   
     const url =new URL(path,baseUrl);
     url.search =filter;

      console.log(url.href);
      
       try {
       
         const response = await fetch(url.href, authToken ? headers:{});
         const data = await response.json();
        
          const flattenedData = flattenAttributes(data);
          
          
          // console.log(flattenedData)
        
          return flattenedData; 
       } catch (error) {
          console.log(error);
       }
    }
 

    export async function getHomePage(){

       const blogBlockQuery =qs.stringify({
            
         populate: ['banner.webBanner', 'banner.mobileBanner'],
            
      });
      
     
      let homePage = await fetchData( "home-page", blogBlockQuery);

      return homePage
   }


    export async function getPostLimitedData(){

        const blogBlockQuery =qs.stringify({
            sort : 'publishedAt',
            pagination:{
             page:1,
             pageSize:3
            },
             populate: ['seo','featureImage'] 
       });

       return await fetchData( "posts", blogBlockQuery);

    }


    export async function geProductCategoryLeftMenu(){

      const blogBlockQuery =qs.stringify({
        
        populate: ['seo', 'products'],
     });
     return await fetchData( "product-categories", blogBlockQuery);

  }


  export async function geProductsByCategory(category, currentPage,pageSize){
  
    const PAGE_SIZE = pageSize;
    
   const blogBlockQuery =qs.stringify({
      
    filters: {
      product_categories: {
         slug:{
          $eq: category,
        },
      },
    },
    populate : ['productImage','product_categories','product_categories.banner.webBanner' ,'product_categories.banner.mobileBanner' ], 
    
   
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },

   });

 
   return await fetchData( "products", blogBlockQuery);

}

export async function geGridCategoybyProduct(){

  const blogBlockQuery =qs.stringify({
    populate : ['banner.webBanner' ,'banner.mobileBanner'],
  });


  return await fetchData( "grid-category-page", blogBlockQuery);

}


export async function geSingleProduct(slug){

  const blogBlockQuery = qs.stringify({
    filters: {
        
            slug: {
                $eq: slug, // Replace 'atlantic-synthetic-10w-40-api-sp' with the actual slug variable
            },
        
    },
    populate: ['productImage', 'seo', 'related_products.productImage', 'product_categories', 'product_categories.banner.webBanner', 'product_categories.banner.mobileBanner'],
});


  return await fetchData( "products", blogBlockQuery);

}


export async function geProductsByGroup(productSlug, groupSlug){
  
  const blogBlockQuery =qs.stringify({
     
    filters: {
      product_group: {
        slug: {
          $eq: groupSlug,
        },
      },
      $and: [
           {
              slug: {
                $ne: productSlug, 
              },
           },
         ],
      
      
    },
    populate: 'productImage', 
    
   
  
   pagination: {
     pageSize: 20,
     page: 1,
   },

  });


  // 
  return await fetchData( "products", blogBlockQuery);

}

 
export async function geProductsBySearch(query){
 
  
    const searchProductQuery = qs.stringify({
      filters: {
        $or: [
          { title: { $containsi: query } },
          { name: { $containsi: query } },
          { api: { $containsi: query } },
          { acea: { $containsi: query } },
        ],
      },
      populate: ['productImage', 'product_categories'],
      pagination: {
        pageSize: 10,
        page: 1,
      },
    });


  // 
  return await fetchData( "products", searchProductQuery);

}


export async function getBlogPage(){

  const blogBlockQuery =qs.stringify({
       
    populate: ['banner.webBanner', 'banner.mobileBanner'],
       
 });
 

 let blogPage = await fetchData( "blog-page", blogBlockQuery);

 return blogPage
}

export async function gePosts(currentPage,pageSize){
  
  const PAGE_SIZE = pageSize;
  
 const blogBlockQuery =qs.stringify({
    
  filters: {
    
  },
  populate : ['featureImage', 'seo'],  
  
 
  pagination: {
    pageSize: PAGE_SIZE,
    page: currentPage,
  },

 });


 return await fetchData( "posts", blogBlockQuery);

}


export async function geSinglePost(slug){

  const blogBlockQuery = qs.stringify({
    filters: {
        
            slug: {
                $eq: slug, 
            },
        
    },
    populate: ['featureImage', 'seo'],
});


  return await fetchData( "posts", blogBlockQuery);

}



export async function getAboutPage(){

  const blogBlockQuery =qs.stringify({
       
    populate: ['banner.webBanner', 'banner.mobileBanner','aboutus.image','founder.image','overValues','ourMission.image','overVisson.image','ourMission.image','overVisson.image'],
       
 });
 

 let aboutPage = await fetchData( "about-us", blogBlockQuery);

 return aboutPage
}


export async function getContactUsPage(){

  const blogBlockQuery =qs.stringify({
       
    populate: ['banner.webBanner', 'banner.mobileBanner','seo'],
       
 });
 

 let contactPage = await fetchData( "contact-us", blogBlockQuery);

 return contactPage

}


export async function geAllProductsSlug(){
  
 const blogBlockQuery =qs.stringify({  
 
  fields:"slug",

 });
 return await fetchData( "products", blogBlockQuery);

}

export async function geAllPostSlug(){
  
  const blogBlockQuery =qs.stringify({  
  
   fields:"slug",
 
  });
  return await fetchData( "posts", blogBlockQuery);
 
 }


 export async function geAllProductCategorySlug(){
  
  const blogBlockQuery =qs.stringify({  
  
   fields:"slug",
 
  });
  return await fetchData( "product-categories", blogBlockQuery);
 
 }