"use client";
import { getReportParentProductCategoryList } from "@/app/data/loader";

import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from "react-loader-spinner";
import ProductReportTable from "@/app/components/layout/product-report-table";
import { MessageCircleWarning } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/libs/helper";


const ReadProductReport = () => {
    const [productCategory, setProductCategory] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* const getFileExtension = (filePath) => {
         const extension = filePath.split('.').pop();
         return extension.toLowerCase();
     };
 */

    useEffect(() => {


        const fetchData = async () => {
            try {
                const productCategoryData = await getReportParentProductCategoryList();
                /*  console.log("----------------------- category--------------------------------------------------");
                  console.dir(productCategoryData.data[0], { depth: null });
                  console.log("---------------------------End----- category---------------------");
    */

                setProductCategory(productCategoryData);
            } catch (e) {
                setError(e);
                console.error('An error occurred while fetching the data: ', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="flex flex-row  items-center justify-center mt-5 pb-16 ">
        <p className="font-normal text-xl text-[#BE1D21] text-center">Compiling data, please wait a moment.......</p>
        <div className="pt-2">
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#FFFFFF"
                color="#BE1D21"
            /> </div>
    </div>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="overflow-x-auto font-serif">

            <div className="text-2xl text-center p-4 flex items-center justify-center ">
                <MessageCircleWarning className=" text-2xl text-red-900 font-semibold mr-2 " />   <span className=" text-red-900">Red-colored products indicate incorrect category placement,</span> <span className=" text-green-800"> Green-colored products may indicate correct category placement.</span>
            </div>

            {productCategory.data.map((category) => (
                <div key={category.id} className="mb-10 bg-blue-50 border border-blue-100 border-collapse p-5">


                    <div className="flex items-center justify-center space-x-3 ">
                        {category.banner?.webBanner.url && category.banner?.webBanner.url !== '' ? (
                            <figure className="text-center">
                                <Image
                                    className="w-14 hover:scale-[10] hover:cursor-pointer transition-transform duration-300 text-right"
                                    src={getImageUrl(category.banner?.webBanner.url)}
                                    height={250}
                                    width={250}
                                    alt=" Web Banner"
                                    priority
                                />
                                <figcaption className="mt-2 text-[10px] text-gray-500">
                                    Web Banner
                                </figcaption>
                            </figure>
                        ) : (
                            <div className="text-center text-[9px] text-red-500">  Web Banner </div>
                        )}

                        {category.banner?.mobileBanner.url && category.banner?.mobileBanner.url !== '' ? (
                            <figure className="text-center">
                                <Image
                                    className="w-12 hover:scale-[10] hover:cursor-pointer transition-transform duration-300 text-right"
                                    src={getImageUrl(category.banner?.mobileBanner.url)}
                                    height={250}
                                    width={250}
                                    alt="Mobile Banner"
                                    priority
                                />
                                <figcaption className="mt-2 text-[10px] text-gray-500">
                                    Mobile Banner
                                </figcaption>
                            </figure>
                        ) : (
                            <div className="text-center text-[9px] text-red-500"> Mobile Banner </div>
                        )}




                    </div>

                    <div className="pb-2 pl-1 text-2xl text-red-900">{category.index}- {category.title || "No Title"}   <span className="pl-5 text-sm text-red-400"> Total Child:{category.child.data.length}</span></div>






                    <ProductReportTable Type="parent" ProductCategory={category} ChildSlug="" />

                    <br />

                    {category.child.data.map((child) => (

                        <div key={child.id} className="ml-5 mt-10 p-5">
                            <div className="pb-2 pl-1 text-xl text-gray-700" >  {child.title || "No Title"} <span className="pl-5 text-sm text-blue-500"> Parent is: {category.title}</span></div>



                            <div className="flex items-center justify-center space-x-3 ">
                                {child.banner?.webBanner.url && child.banner?.webBanner.url !== '' ? (
                                    <figure className="text-center">
                                        <Image
                                            className="w-12 hover:scale-[10] hover:cursor-pointer transition-transform duration-300 text-right"
                                            src={getImageUrl(child.banner?.webBanner.url)}
                                            height={250}
                                            width={250}
                                            alt=" Web Banner"
                                            priority
                                        />
                                        <figcaption className="mt-2 text-[10px] text-gray-500">
                                            Web Banner
                                        </figcaption>
                                    </figure>
                                ) : (
                                    <div className="text-center text-[9px] text-red-500">  Web Banner </div>
                                )}

                                {child.banner?.mobileBanner.url && child.banner?.mobileBanner.url !== '' ? (
                                    <figure className="text-center">
                                        <Image
                                            className="w-12 hover:scale-[10] hover:cursor-pointer transition-transform duration-300 text-right"
                                            src={getImageUrl(child.banner?.mobileBanner.url)}
                                            height={250}
                                            width={250}
                                            alt="Mobile Banner"
                                            priority
                                        />
                                        <figcaption className="mt-2 text-[10px] text-gray-500">
                                            Mobile Banner
                                        </figcaption>
                                    </figure>
                                ) : (
                                    <div className="text-center text-[9px] text-red-500"> Mobile Banner </div>
                                )}

                                {child.image?.url && category.image?.url !== '' ? (
                                    <figure className="text-center">
                                        <Image
                                            className="w-10  hover:scale-[8] hover:cursor-pointer transition-transform duration-300 text-right"
                                            src={getImageUrl(child.image?.url)}
                                            height={250}
                                            width={250}
                                            alt=" Button Color"
                                            priority
                                        />
                                        <figcaption className="mt-2 text-[10px] text-gray-500">
                                            Button Color
                                        </figcaption>
                                    </figure>
                                ) : (
                                    <div className="text-center text-[9px] text-red-500"> Button Color </div>
                                )}

                                {child.bImage?.url && child.bImage?.url !== '' ? (
                                    <figure className="text-center">
                                        <Image
                                            className="w-10  hover:scale-[8] hover:cursor-pointer transition-transform duration-300 text-right"
                                            src={getImageUrl(child.bImage?.url)}
                                            height={250}
                                            width={250}
                                            alt=" Button Black"
                                            priority
                                        />
                                        <figcaption className="mt-2 text-[10px] text-gray-500">
                                            Button Black
                                        </figcaption>
                                    </figure>
                                ) : (
                                    <div className="text-center text-[9px] text-red-500">  Button Black </div>
                                )}


                            </div>


                            <ProductReportTable Type="child" ProductCategory="" ChildSlug={child.slug} />
                        </div>

                    ))}
                    <br />
                </div>
            ))
            }

            <br />

            <div className="mb-10 bg-blue-50 border border-blue-100 border-collapse p-5">
                <div className="pb-2 pl-1 text-xl" >Uncategorized Products <span className="pl-5 text-sm text-blue-500"> Reassign products to the correct subcategory</span></div>
                <ProductReportTable Type="uncategorized" ProductCategory="" ChildSlug="" />
            </div>




        </div >
    );
};

export default ReadProductReport;
