'use client';

import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function SideAccordion({ Categories }) {

    const [activeItem, setActiveItem] = useState(null)

    // Open first tab by default
    useEffect(() => {
        if (!activeItem && Categories.length > 0) {
            setActiveItem(Categories[0].id)
        }
    }, [activeItem, Categories])

    return (
        <div className="flex  gap-0 w-full relative  z-999   ">
            {/* Left side: tab list */}
            <div className="w-[45%] pr-0 pl-0  bg-[#587482]    ">
                <div className="pb-0">
                    {Categories.map((parent) => (
                        <div
                            key={parent.id}
                            onClick={() => setActiveItem(parent.id)}
                            onMouseEnter={() => setActiveItem(parent.id)}
                            className={`flex justify-between items-center w-full px-3 py-3 cursor-pointer mt-[1px] bg-[#344a55] 
                                 ${activeItem === parent.id ? 'bg-[#255269] font-semibold' : ''
                                } hover:bg-[#255269] hover:font-semibold transition`}
                        >
                            <span className="text-[#ffe000] break-words text-base  tracking-normal">
                                {parent.title}
                            </span>
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side: content display */}
            <div className="w-[55%] bg-[#587482] ">
                {Categories.map((parent) =>
                    activeItem === parent.id ? (
                        <div
                            key={parent.id}
                            className=" flex  flex-col w-full p-2 pt-3 text-base    break-words text-wrap overflow-hidden max-h-[400px]"
                        >
                            <div className="text-[#ffe000] font-semibold mb-2 tracking-normal">

                                <Link
                                    href={`/product-category/${parent.slug}`}
                                    className="w-full block p-1 break-words   hover:underline tracking-normal"
                                >
                                    {parent.title}
                                </Link>
                            </div>

                            {parent.child?.data?.map((cate) => (
                                <div key={cate.id} className="flex flex-col space-y-1 w-[80%]  ">
                                    <Link
                                        href={`/product-category/${cate.slug}`}
                                        className="w-full block p-1 break-words  text-white hover:underline tracking-normal"
                                    >
                                        {cate.title}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : null
                )}
            </div>
        </div>
    )
}
