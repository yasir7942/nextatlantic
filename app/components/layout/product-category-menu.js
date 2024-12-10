"use client";

import { IoMdMenu } from "react-icons/io";
import { useState, useEffect } from "react";
import { geProductCategoryLeftMenu } from "@/app/data/loader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
/*
const ProductCategoryMenu = async () => {
  
  const menuData = await geProductCategoryLeftMenu();
  const filteredMenuData = menuData.data.filter(
    (menu) => menu.products.data.length > 0
  );

  */

const ProductCategoryMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [openSheet, setOpenSheet] = useState(false);

  // Fetch data on client-side when component mounts
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await geProductCategoryLeftMenu();
        const filteredData = response.data.filter(
          (menu) => menu.products.data.length > 0
        );
        setMenuData(filteredData);
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <div>
      <div className="hidden md:flex flex-row md:flex-col space-y-0 space-x-2 md:space-y-4 md:space-x-0 text-gray-300 uppercase">
        <div className="fex fex-col space-y-3 text-base md:font-normal md:text-lg">
          <a href="#">Product Categories</a>
          <div className="w-full h-[1px] bg-[#0f0f0f]"> </div>
        </div>
        {menuData.map((menu) => (
          <div key={menu.id} className="fex fex-col space-y-3 text-base md:font-light md:text-lg">
            <Link href={`/product-category/${menu.slug}`}>
              {menu.title} - <span className="text-base">({menu.products.data.length})</span>
            </Link>
            <div className="w-full h-[1px] bg-[#0f0f0f]"> </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-start md:hidden text-white">
        <Sheet open={openSheet} onOpenChange={setOpenSheet} >
          <SheetTrigger className="flex justify-start items-end space-x-2">
            <IoMdMenu size={20} />
            <div className="font-light">Product Category</div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px]">
            <SheetHeader>
              <SheetDescription className="h-screen w-full pb-16">
                <div className="w-full h-full overflow-hidden py-3">
                  <div className="w-[218px] h-full overflow-y-auto">
                    <div className="fex fex-col space-y-3 text-left mb-5 text-base font-normal">
                      <a href="#">Products Categories</a>
                    </div>
                    {menuData.map((menu) => (
                      <div key={"mobile-" + menu.id} className="fex fex-col text-left pl-2 space-y-3 mt-2 text-base font-light">
                        <Link href={`/product-category/${menu.slug}`} onClick={() => setOpenSheet(false)} >{menu.title}</Link>
                        <div className="w-[70%] h-[1px] bg-[#0f0f0f]"> </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ProductCategoryMenu;
