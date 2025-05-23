"use client";
import { getParentProductCategoryList } from "@/app/data/loader";
import { getImageUrl } from "@/libs/helper";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from "react-loader-spinner";
import ProductReportTable from "./product-report-table";

const ReadProductReport = () => {
    const [productCategory, setProductCategory] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFileExtension = (filePath) => {
        const extension = filePath.split('.').pop();
        return extension.toLowerCase();
    };


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

            {productCategory.data.map((category) => (
                <div key={category.id} className="mb-10 bg-blue-50 border border-blue-100 border-collapse p-5">
                    <div className="pb-2 pl-1 text-2xl">{category.index}- {category.title || "No Title"}   <span className="pl-5 text-sm text-blue-500"> Total Child:{category.child.data.length}</span></div>


                    <ProductReportTable Type="parent" ProductCategory={category} ChildSlug="" />

                    <br />

                    {category.child.data.map((child) => (

                        <div key={child.id} className="ml-5 mt-10 p-5">
                            <div className="pb-2 pl-1 text-xl" >  {child.title || "No Title"} <span className="pl-5 text-sm text-blue-500"> Parent is: {category.title}</span></div>
                            <ProductReportTable Type="child" ProductCategory="" ChildSlug={child.slug} />
                        </div>

                    ))}
                    <br />
                </div>
            ))
            }
        </div >
    );
};

export default ReadProductReport;
