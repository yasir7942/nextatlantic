"use client";
import { getProductCategoryList } from "@/app/data/loader";
import { getImageUrl } from "@/libs/helper";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from "react-loader-spinner";

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
                const productCategoryData = await getProductCategoryList();
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

    if (loading) return <div className="flex flex-row  items-center justify-center mt-5 pb-16">
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
                <div key={category.id}>
                    <div className="pb-2 pl-1">{category.title || "No Title"}</div>
                    <table className="table-auto w-full border-collapse border  border-gray-200 text-gray-950">
                        <thead>
                            <tr>
                                <th className="border border-gray-200 text-sm">P. Id</th>
                                <th className="border border-gray-200 text-sm">Title</th>
                                <th className="border border-gray-200 text-sm">Name</th>
                                <th className="border border-gray-200 text-sm">Grade/Line 1</th>
                                <th className="border border-gray-200 text-sm">API/Line 2</th>
                                <th className="border border-gray-200 text-sm">acea/Line 3</th>
                                <th className="border border-gray-200 text-sm">Packing</th>
                                <th className="border border-gray-200 text-sm">TDSFile</th>
                                <th className="border border-gray-200 text-sm">MSDSFile</th>
                                <th className="border border-gray-200 text-sm">Image</th>
                                <th className="border border-gray-200 text-sm">SEO ALT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.products?.data?.map((product) => (
                                <tr key={product.id} className={product.publishedAt === null ? ' bg-red-400 cursor-not-allowed text-sm' : ''}>
                                    <td className="border text-sm   border-gray-200 text-center font-semibold">
                                        {product.id || <div className="text-center text-red-500"> --- </div>}
                                    </td>
                                    <td className="border text-sm font-light border-gray-200">
                                        {product.publishedAt === null ? 'Deleted ' : ''}  {<a rel="nofollow" href={product.publishedAt === null ? '#' : `/product/${product.slug}`} className={product.publishedAt === null ? ' no-underline cursor-not-allowed   pointer-events-none ' : 'underline'} target="_blank" > {product.title} </a> || <div className="text-center text-red-500"> --- </div>}
                                    </td>
                                    <td className="border text-sm font-light border-gray-200">
                                        {product.name || <div className="text-center text-red-500"> --- </div>}
                                    </td>
                                    <td className="border text-sm font-light border-gray-200">
                                        {product.grade || <div className="text-center text-red-500"> --- </div>}
                                    </td>
                                    <td className="border text-sm font-light border-gray-200">
                                        {product.api || <div className="text-center text-red-500"> --- </div>}
                                    </td>
                                    <td className="border text-sm font-light border-gray-200">
                                        {product.acea || <div className="text-center text-red-500"> --- </div>}
                                    </td>
                                    <td className="border text-sm font-light border-gray-200">
                                        {product.packing || <div className="text-center text-red-500"> --- </div>}
                                    </td>
                                    <td className="border text-sm font-light border-gray-200">
                                        {product.TDSFile?.url ? (
                                            <a href={`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}${product.TDSFile.url}`} className="underline uppercase" target="_blank" rel="noopener noreferrer">
                                                TDS {product.TDSFile.url.split('.').pop()}
                                            </a>
                                        ) : (
                                            <div className="text-center text-red-500"> --- </div>
                                        )}
                                    </td>
                                    <td className="border text-sm font-light border-gray-200">
                                        {product.MSDSFile?.url ? (
                                            <a href={`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}${product.MSDSFile.url}`} className="underline uppercase" target="_blank" rel="noopener noreferrer">
                                                MSDS {product.MSDSFile.url.split('.').pop()}
                                            </a>
                                        ) : (
                                            <div className="text-center text-red-500"> --- </div>
                                        )}
                                    </td>
                                    <td className="border text-sm font-light flex items-center justify-center">
                                        {product.productImage?.url ? (
                                            <Image
                                                className="w-6 hover:scale-[8] hover:cursor-pointer transition-transform duration-500"
                                                src={getImageUrl(product.productImage.url)}
                                                height={250}
                                                width={250}
                                                alt="product image"
                                                priority
                                            />
                                        ) : (
                                            <div className="text-center text-red-500"> --- </div>
                                        )}
                                    </td>
                                    <td className="border text-sm font-light border-gray-200">
                                        {product.productImage?.alternativeText || <div className="text-center text-red-500"> --- </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br /><br />
                </div>
            ))
            }
        </div >
    );
};

export default ReadProductReport;
