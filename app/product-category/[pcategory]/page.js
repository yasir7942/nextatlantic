

import PaddingContainer from "@/app/components/layout/padding-container"
import ProductCategoryMenu from "@/app/components/layout/product-category-menu";
import SearchBar from "@/app/components/layout/search-bar";
import TopBanner from "@/app/components/layout/top-banner"
import Image from "next/image";
import { geAllProductsSlug, geProductsByCategory } from "@/app/data/loader"
import Link from 'next/link';
import NotFound from "@/app/not-found";
import { PaginationComponent } from "@/app/components/elements/pagination";
import { getImageUrl } from "@/libs/helper";
import { Suspense } from "react";



export const generateStaticParams = async () => {

  try {
    const productSlugs = await geAllProductsSlug();

    const paramsSlugs = productSlugs?.data?.map((product) => {
    //  console.log("*******Product slug: "+ product.slug);
      return {
        slug: product.slug
      };
    })

    return paramsSlugs || [];
  } catch (error) {
        console.log(error);
        throw new Error("Error Fetching generateStaticParams");
  }

}



const pageSize = 5;
const numbers = Array.from({ length: 12 }, (_, index) => index + 1);


const ProductCategory = async ({ params, searchParams }) => {

  const currentPage = Number(searchParams.page) || 1;





   
  // product show by category

  const productData = await geProductsByCategory(params.pcategory, currentPage, pageSize);

  const PageCount = productData.meta.pagination.pageCount;
  const totalPage = productData.meta.pagination.total;

     console.log("-----------------------products --------------------------------------------------");
  //  console.dir(productData, { depth:null}); 
  // console.log("---------------------------End--------p category---------------end-----------------------");
  //  console.log(productData.data);
  // if(productData.data.length === 0)  return  <NotFound />

  //console.dir(productData.data.title, { depth:null});
  // console.log();

  return (
    <div>
      <TopBanner banner={productData?.data[0]?.product_categories.data[0].banner} />


      <PaddingContainer>


        <div className="w-full h-auto flex flex-col md:flex-row  ">
          {/*  Left Menu Column  */}
          <div className="w-full md:w-3/12 lg:w-1/6  p-6 md:pl-0  overflow-hidden">
            {/* <!-- Menu content goes here   */}
            <ProductCategoryMenu />
          </div>

          {/*  Content Area   */}
          <div className=" w-full md:w-9/12 lg:w-5/6  flex flex-col bg-[#2a3c46] p-3 md:p-4 pb-3 ">
            {/*   Content area content goes here  */}
            <SearchBar dataType="products" />


            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 mt-3   ">

              {productData.data.map((product) => (
                <div key={product.id} className=" pt-0 mt-10 relative text-center flex flex-col  justify-center">

                  <div className="w-full      flex justify-center  ">
                    <Link href={`/product/${product.slug}`} > <Image className="relative w-28 text-center" src={getImageUrl(product?.productImage.url)} height={400} width={400} alt={product.name} /> </Link>
                  </div>
                  <div className="flex flex-col w-full h-full " >
                    <h2 className="uppercase text-lg text-burnYellow mt-3 leading-1"><Link href={`/product/${product.slug}`}  >{product.name}</Link> </h2>
                    <p className="text-gray-200 xl:text-xl  text-base font-light  leading-5 uppercase">{product.grade}</p>

                    <p className="text-gray-200 xl:text-xl text-base font-light  leading-5 uppercase">{product.api}</p>
                    <p className="text-gray-200 xl:text-xl  text-base font-light  leading-5 uppercase">{product.acea}</p>
                  </div>

                  <Link href={`/product/${product.slug}`} className="uppercase w-full  text-center p-x-5 bg-burnYellow text-black mt-2"> View </Link>


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
