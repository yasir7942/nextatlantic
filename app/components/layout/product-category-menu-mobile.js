"use client";

import { IoMdMenu } from "react-icons/io";
import { useState, useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";


const ProductCategoryMenuClient = ({ MenuData, Selected = "" }) => {
    const [openSheet, setOpenSheet] = useState(false);


    const [open, setOpen] = useState(undefined);

    useEffect(() => {
        setOpen(Selected); // Open selected tab on load
    }, [Selected]);




    return (
        <div className="flex flex-row justify-start md:hidden text-white ">
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger className="flex justify-start items-end space-x-2">
                    <IoMdMenu size={20} />
                    <div className="font-semibold">Product Category</div>
                </SheetTrigger>
                <SheetContent side="left" className="w-[70%]  z-max">
                    <SheetHeader>
                        <SheetTitle className="hidden">Product Categories</SheetTitle>
                        <SheetDescription></SheetDescription>
                        <div className="h-screen w-full pb-20     ">
                            <div className="w-full h-full overflow-hidden py-3 text-gray-300   ">
                                <div className="w-full h-full overflow-y-auto overflow-x-hidden pb-20    hide-scrollbar">
                                    <div className="flex flex-col space-y-3 text-left mb-5 text-xl font-semibold">
                                        <a href="#">Products Categories</a>
                                    </div>



                                    <Accordion type="single" collapsible className="w-full" value={open} onValueChange={(value) => setOpen(value)}>
                                        {
                                            MenuData.map((menu) => (
                                                <AccordionItem key={menu.id} value={menu.slug} className="border-b border-gray-700" >
                                                    <AccordionTrigger className="text-left font-semibold"> {menu.title} </AccordionTrigger>
                                                    <AccordionContent>
                                                        {menu.child.data.map((cate) => (
                                                            <div key={cate.id} className="flex flex-col space-y-0 text-left">
                                                                <Link href={`/product-category/${cate.slug}`} onClick={() => setOpenSheet(false)} className="w-full block  text-left  p-1 pl-3">
                                                                    {cate.title}
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))
                                        }
                                    </Accordion>






                                </div>
                            </div>
                        </div>
                    </SheetHeader>




                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ProductCategoryMenuClient;
