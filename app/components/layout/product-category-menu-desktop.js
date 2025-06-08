
"use client";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";


const ProductCategoryManuDesktop = ({ MenuData, Selected = "" }) => {


    const [open, setOpen] = useState(Selected || "");

    useEffect(() => {
        setOpen(Selected); // Open selected tab on load
    }, [Selected]);



    return (



        <div className="hidden md:flex flex-row md:flex-col space-y-0 space-x-2 md:space-y-4 md:space-x-0 text-gray-300   ">


            <div className="flex flex-col space-y-0 text-left mb-2 text-xl font-semibold">
                <a href="#">Products Categories</a>
            </div>

            <Accordion type="single" collapsible className="w-full" value={open} onValueChange={(value) => setOpen(value)}>
                {
                    MenuData.map((menu) => (
                        <AccordionItem key={menu.id} value={menu.slug} className="border-b border-gray-500" >
                            <AccordionTrigger className="text-left"> <Link href={`/product-category/${menu.slug}`} >{menu.title}</Link></AccordionTrigger>
                            <AccordionContent>
                                {menu.child.data.map((cate) => (

                                    <div key={cate.id} className="flex flex-col space-y-1">
                                        <Link href={`/product-category/${cate.slug}`} className="w-full block   p-1 pl-3">
                                            {cate.title}
                                        </Link>
                                    </div>

                                ))}
                            </AccordionContent>
                        </AccordionItem>

                    ))
                }



            </Accordion>




            {/*  <div className="flex flex-col space-y-3 text-base md:font-semibold md:text-lg ">
                <a href="#">Product Categories</a>
                <div className="w-full h-[1px] bg-[#0f0f0f]"></div>
            </div>
            {MenuData.map((menu) => (
                <div key={menu.id} className="flex flex-col space-y-3 text-base md:font-light md:text-lg">
                    <Link href={`/product-category/${menu.slug}`}>
                        {menu.title}
                    </Link>

                    {menu.child.data.map((cate) => (
                        <Link key={cate.id} href={`/product-category/${cate.slug}`}>
                            --{cate.title}
                        </Link>
                    ))}
                    <div className="w-full h-[1px] bg-[#0f0f0f]"></div>
                </div>
            ))}*/}
        </div >
    )
}

export default ProductCategoryManuDesktop
