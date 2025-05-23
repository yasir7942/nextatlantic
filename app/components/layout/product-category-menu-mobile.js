"use client";

import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const ProductCategoryMenuClient = ({ menuData }) => {
    const [openSheet, setOpenSheet] = useState(false);

    return (
        <div className="flex flex-row justify-start md:hidden text-white">
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger className="flex justify-start items-end space-x-2">
                    <IoMdMenu size={20} />
                    <div className="font-light">Product Category</div>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px]">
                    <SheetHeader>
                        <SheetTitle className="hidden">Product Categories</SheetTitle>
                        <SheetDescription></SheetDescription>
                        <div className="h-screen w-full pb-16 ">
                            <div className="w-full h-full overflow-hidden py-3 text-gray-300 ">
                                <div className="w-[218px] h-full overflow-y-auto">
                                    <div className="flex flex-col space-y-3 text-left mb-5 text-base font-normal">
                                        <a href="#">Products Categories</a>
                                    </div>
                                    {menuData.map((menu) => (
                                        <div
                                            key={"mobile-" + menu.id}
                                            className="flex flex-col text-left pl-2 space-y-3 mt-2 text-base font-light"
                                        >
                                            <div>
                                                <Link href={`/product-category/${menu.slug}`} onClick={() => setOpenSheet(false)}>
                                                    {menu.title}
                                                </Link>
                                            </div>
                                            <div className="w-[70%] h-[1px] bg-[#0f0f0f]"></div>
                                        </div>
                                    ))}
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
