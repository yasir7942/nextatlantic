"use client";
import { getParentProductCategoryList } from "@/app/data/loader";

import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from "react-loader-spinner";
import ProductReportTable from "@/app/components/layout/product-report-table";
import { MessageCircleWarning } from "lucide-react";


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
                const productCategoryData = await getParentProductCategoryList();
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
                <MessageCircleWarning className=" text-2xl text-red-900 font-semibold mr-2 " />   <span className=" text-red-900">Red-colored products indicate incorrect category placement,</span> <span className=" text-green-800">while green-colored products indicate correct category placement.</span>
            </div>

            {productCategory.data.map((category) => (
                <div key={category.id} className="mb-10 bg-blue-50 border border-blue-100 border-collapse p-5">
                    <div className="pb-2 pl-1 text-2xl text-red-900">{category.index}- {category.title || "No Title"}   <span className="pl-5 text-sm text-red-400"> Total Child:{category.child.data.length}</span></div>


                    <ProductReportTable Type="parent" ProductCategory={category} ChildSlug="" />

                    <br />

                    {category.child.data.map((child) => (

                        <div key={child.id} className="ml-5 mt-10 p-5">
                            <div className="pb-2 pl-1 text-xl text-gray-700" >  {child.title || "No Title"} <span className="pl-5 text-sm text-blue-500"> Parent is: {category.title}</span></div>
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
