import PaddingContainer from "@/app/components/layout/padding-container"
import ProductCategoryMenu from "@/app/components/layout/product-category-menu";
import SearchBar from "@/app/components/layout/search-bar";
import TopBanner from "@/app/components/layout/top-banner"
import Image from "next/image";
import { geAllProductCategorySlug, geProductsByCategory, getProductCategory } from "@/app/data/loader"

import { PaginationComponent } from "@/app/components/elements/pagination";
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import { getFirstDescriptionText, getImageUrl } from "@/libs/helper";
import { Suspense } from "react";
import SEOSchema from "@/app/components/elements/seo-schema";
import { notFound } from "next/navigation";




const pageSize = 12;

/* 
export const generateStaticParams = async () => {
 try {


   const pcategorySlugs = await geAllProductCategorySlug();
   const slugCount = pcategorySlugs?.data?.length || 0;
   let pages = Math.round(slugCount/ pageSize);
   
   if(slugCount <= pageSize)
   {
     pages = 0;
   }
   
   const paramsSlugs = pcategorySlugs?.data?.flatMap((pCat) => {
     const totalPages = pages;  

     return Array.from({ length: totalPages + 1 }, (_, i) => ({  // +1 to include the category page
       slug: pCat.slug + (i > 0 ?  "?page=" + i: ""),
      // ...(i > 0 && { page: i })   Include page only if i > 0
     }));
   });
   
 
   // console.log(paramsSlugs);
   return paramsSlugs || [];
 } catch (error) {
   console.log(error);
   throw new Error("Error Fetching generateStaticParams");
 }
}
*/





export async function generateMetadata(props) {
  const params = await props.params;

  const categoryData = await getProductCategory(params.pcategory);
  if (!categoryData || !categoryData.data[0]) {
    NotFound();
  }

  const metadataParams = {
    pageTitle: categoryData.data[0].title,
    pageSlug: categoryData.data[0].slug,
    pageDescription: getFirstDescriptionText(categoryData.data[0].description),   // 0
    seoTitle: categoryData.data[0].seo?.seoTitle,
    seoDescription: categoryData.data[0].seo?.seoDescription | "",
    rebotStatus: categoryData.data[0].seo?.preventIndexing,
    canonicalLinks: categoryData.data[0].seo?.canonicalLinks,  // null
    dataPublishedTime: categoryData.data[0].publishedAt,
    category: "",
    image: process.env.NEXT_PUBLIC_ADMIN_BASE_URL + categoryData.data[0].banner?.mobileBanner?.url,
    imageAlternativeText: categoryData.data[0].banner?.mobileBanner?.alternativeText,   // null
    imageExt: categoryData.data[0].banner?.mobileBanner?.mime,
  };



  return await generatePageMetadata({ type: "category", path: "/product-category/", params: metadataParams });
}










const ProductCategory = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;


  const categoryData = await getProductCategory(params.pcategory);  // use cache

  if (!categoryData || !categoryData.data[0]) {
    notFound();
  }

  const currentPage = Number(searchParams.page) || 1;

  // product show by category

  const productData = await geProductsByCategory(params.pcategory, currentPage, pageSize);



  const PageCount = productData.meta.pagination.pageCount;
  const totalPage = productData.meta.pagination.total;

  //  console.log("-----------------------products --------category page------------------------------------------");
  // console.dir(productData, { depth:null}); 
  // console.log("---------------------------End--------p category---------------end-----------------------");
  //  console.log(productData.data);
  // if(productData.data.length === 0)  return  <NotFound />

  //console.dir(productData.data.title, { depth:null});
  // console.log();

  return (
    <div>

      <SEOSchema schemaList={productData.data[0]?.seo?.schema} />

      <TopBanner banner={productData?.data[0]?.product_categories.data[0]?.banner} />


      <PaddingContainer>


        <div className="w-full h-auto flex flex-col md:flex-row  topPadding ">
          {/*  Left Menu Column  */}
          <div className="w-full md:w-3/12 lg:w-1/6  p-6 md:pl-0  overflow-hidden ">
            {/* <!-- Menu content goes here   */}
            <ProductCategoryMenu />
          </div>

          {/*  Content Area   */}
          <div className=" w-full md:w-9/12 lg:w-5/6  flex flex-col bg-[#2a3c4659] p-3 md:p-4 pb-3 ">
            {/*   Content area content goes here  */}
            <SearchBar dataType="products" />


            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 mt-3   ">

              {productData.data.map((product) => (
                <div key={product.id} className=" pt-0 mt-10 relative text-center flex flex-col  justify-center">

                  <div className="w-full flex justify-center  ">
                    <a href={`/product/${product.slug}`} > <Image className="relative w-28 text-center" src={getImageUrl(product?.productImage.url)} priority height={400} width={400} alt={product.name} /> </a>
                  </div>
                  <div className="flex flex-col w-full h-full " >
                    <h2 className="uppercase text-lg text-burnYellow mt-3 leading-1"> <a href={`/product/${product.slug}`} >
                      {product.name}</a> </h2>
                    <p className="text-gray-200 xl:text-xl  text-base font-light  leading-5 uppercase">{product.grade}</p>

                    <p className="text-gray-200 xl:text-xl text-base font-light  leading-5 uppercase">{product.api}</p>
                    <p className="text-gray-200 xl:text-xl  text-base font-light  leading-5 uppercase">{product.acea}</p>
                  </div>

                  <a href={`/product/${product.slug}`} className="uppercase w-full  text-center p-x-5 bg-burnYellow text-black mt-2"> View </a>
                </div>

              ))}

            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <PaginationComponent pageCount={PageCount} totalPage={totalPage} pageSize={pageSize} />
            </Suspense>
          </div>


        </div>


      </PaddingContainer>


    </div>


  )
}

export default ProductCategory
