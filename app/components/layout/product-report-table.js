'use client';

import { getChildProductCategory, getUncategorizedProducts } from "@/app/data/loader";
import { getImageUrl } from "@/libs/helper";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from "react-loader-spinner";

const ProductReportTable = ({ Type, ProductCategory = "", ChildSlug = "" }) => {
    const [childProducts, setChildProducts] = useState({
        title: '',
        products: { data: [] }
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (Type === "child") {
                    const productCategoryData = await getChildProductCategory(ChildSlug);
                    const fallback = {
                        title: "Unknown Category",
                        products: { data: [] }
                    };

                    const safeData = productCategoryData?.data?.[0] ?? fallback;
                    if (!safeData.products || !Array.isArray(safeData.products.data)) {
                        safeData.products = { data: [] };
                    }

                    setChildProducts(safeData);
                } else if (Type === "uncategorized") {
                    const allProducts = await getUncategorizedProducts();
                    setChildProducts({
                        title: "Uncategorized",
                        products: { data: allProducts || [] }
                    });
                } else {
                    const safeCategory = ProductCategory || { title: "Default", products: { data: [] } };
                    if (!safeCategory.products || !Array.isArray(safeCategory.products.data)) {
                        safeCategory.products = { data: [] };
                    }
                    setChildProducts(safeCategory);
                }
            } catch (e) {
                setError(e);
                console.error('An error occurred while fetching the data: ', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [Type, ChildSlug, ProductCategory]);

    if (loading) {
        return (
            <div className="flex flex-row items-center justify-center mt-5 pb-16">
                <p className="font-normal text-xl text-[#BE1D21] text-center">Loading Child.......</p>
                <div className="pt-2">
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="magnifying-glass-loading"
                        glassColor="#FFFFFF"
                        color="#BE1D21"
                    />
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-600 text-center mt-4">Error: {error.message}</p>;
    }

    return (
        <table className={`table-auto w-full border-collapse border border-gray-300 ${Type === "child" ? "text-gray-950" : "text-red-700"}`}>
            <thead>
                <tr>
                    <th className="border border-gray-300 text-sm">P. Id</th>
                    <th className="border border-gray-300 text-sm">Title</th>
                    <th className="border border-gray-300 text-sm">Name</th>
                    <th className="border border-gray-300 text-sm">Action</th>
                    <th className="border border-gray-300 text-sm">Grade/Line 1</th>
                    <th className="border border-gray-300 text-sm">API/Line 2</th>
                    <th className="border border-gray-300 text-sm">acea/Line 3</th>
                    <th className="border border-gray-300 text-sm">Packing</th>
                    <th className="border border-gray-300 text-sm">TDSFile</th>
                    <th className="border border-gray-300 text-sm">MSDSFile</th>
                    <th className="border border-gray-300 text-sm">Image</th>
                    <th className="border border-gray-300 text-sm">SEO ALT</th>
                </tr>
            </thead>
            {Array.isArray(childProducts.products?.data) && childProducts.products.data.length > 0 ? (
                <tbody className={`${Type === "child" ? "text-green-800" : ""}`}>
                    {childProducts.products.data.map((product) => (
                        <tr key={product.id} className={product.publishedAt === null ? 'hidden' : ''}>
                            <td className="border text-sm border-gray-300 text-center font-semibold">
                                {product.id || <div className="text-center text-red-500"> --- </div>}
                            </td>
                            <td className="border text-sm font-light border-gray-300">
                                {product.publishedAt === null ? 'Deleted ' : ''}
                                <a
                                    rel="nofollow"
                                    href={product.publishedAt === null ? '#' : `/product/${product.slug}`}
                                    className={product.publishedAt === null ? 'no-underline cursor-not-allowed pointer-events-none' : 'underline'}
                                    target="_blank"
                                >
                                    {product.title}
                                </a>
                            </td>
                            <td className="border text-sm font-light border-gray-300">
                                {product.name || <div className="text-center text-red-500"> --- </div>}
                            </td>
                            <td className="border text-sm font-light border-gray-300">
                                <a
                                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/content-manager/collection-types/api::product.product/${product.id}`}
                                    className="underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Edit
                                </a>
                            </td>
                            <td className="border text-sm font-light border-gray-300">
                                {product.grade || <div className="text-center text-red-500"> --- </div>}
                            </td>
                            <td className="border text-sm font-light border-gray-300">
                                {product.api || <div className="text-center text-red-500"> --- </div>}
                            </td>
                            <td className="border text-sm font-light border-gray-300">
                                {product.acea || <div className="text-center text-red-500"> --- </div>}
                            </td>
                            <td className="border text-sm font-light border-gray-300">
                                {product.packing || <div className="text-center text-red-500"> --- </div>}
                            </td>
                            <td className="border text-sm font-light border-gray-300">
                                {product.TDSFile?.url ? (
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}${product.TDSFile.url}`}
                                        className="underline uppercase"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        TDS {product.TDSFile.url.split('.').pop()}
                                    </a>
                                ) : (
                                    <div className="text-center text-red-500"> --- </div>
                                )}
                            </td>
                            <td className="border text-sm font-light border-gray-300">
                                {product.MSDSFile?.url ? (
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}${product.MSDSFile.url}`}
                                        className="underline uppercase"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
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
                            <td className="border text-sm font-light border-gray-300">
                                {product.productImage?.alternativeText || <div className="text-center text-red-500"> --- </div>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            ) : (
                <tbody>
                    <tr>
                        <td colSpan={12} className="text-center py-4 text-red-500">
                            No Products Available
                        </td>
                    </tr>
                </tbody>
            )}
        </table>
    );
};

export default ProductReportTable;
