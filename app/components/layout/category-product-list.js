import Link from "next/link"
import PaddingContainer from "./padding-container"
import SearchBar from "./search-bar"
import { PaginationComponent } from "../elements/pagination"
import { Suspense } from "react";
import Image from "next/image";
import ProductCategoryMenu from "./product-category-menu";
import { getImageUrl } from "@/libs/helper";




const CategoryProductlist = async ({ selectedCategoryParent, productData, PageSize }) => {

    const categoryParent = await selectedCategoryParent;
    const Products = await productData;
    const pageSize = await PageSize;



    const PageCount = Products.meta.pagination.pageCount;
    const totalPage = Products.meta.pagination.total;


    return (
        <div className="z-60 relative">




            <PaddingContainer>


                <div className="w-full h-auto flex flex-col md:flex-row  topPadding ">
                    {/*  Left Menu Column  */}
                    <div className="w-full md:w-3/12 lg:w-1/6  p-6 md:pl-0  overflow-hidden ">
                        {/* <!-- Menu content goes here   */}
                        <ProductCategoryMenu Parent={categoryParent} />
                    </div>

                    {/*  Content Area   */}
                    <div className=" w-full md:w-9/12 lg:w-5/6  flex flex-col bg-[#2a3c4659] p-3 md:p-4 pb-3 ">
                        {/*   Content area content goes here  */}
                        <SearchBar dataType="products" />


                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 mt-3   ">

                            {Products.data.map((product) => (
                                <div key={product.id} className=" pt-0 mt-10 relative text-center flex flex-col  justify-center">

                                    <div className="w-full flex justify-center  ">
                                        {product?.productImage?.url && (
                                            <Link href={`/product/${product.slug}`}>
                                                <Image
                                                    className="relative w-28 text-center"
                                                    src={getImageUrl(product.productImage.url)}
                                                    priority
                                                    height={400}
                                                    width={400}
                                                    alt={product.name}
                                                />
                                            </Link>
                                        )}

                                    </div>
                                    <div className="flex flex-col w-full h-full " >
                                        <h2 className="uppercase text-lg text-burnYellow mt-3 leading-1"> <a href={`/product/${product.slug}`} >
                                            {product.name}</a> </h2>
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

export default CategoryProductlist
