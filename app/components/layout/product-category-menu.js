


import Link from "next/link";
import ProductCategoryMenuMobile from "./product-category-menu-mobile";
import { geProductCategoryLeftMenu } from "@/app/data/loader";

const ProductCategoryMenu = async () => {


  const menuData = await geProductCategoryLeftMenu();
  // Ensure menuData.data is always an array
  const filteredData = Array.isArray(menuData.data)
    ? menuData.data.filter(menu => menu.products.data.length > 0)
    : [];


  /* console.log("Raw menuData:", menuData);
   console.log("menuData.data Type:", typeof menuData.data);
   console.log("menuData.data isArray:", Array.isArray(menuData.data));
 */

  return (
    <div>
      {/* Desktop Menu */}
      <div className="hidden md:flex flex-row md:flex-col space-y-0 space-x-2 md:space-y-4 md:space-x-0 text-gray-300 uppercase">
        <div className="flex flex-col space-y-3 text-base md:font-normal md:text-lg">
          <a href="#">Product Categories</a>
          <div className="w-full h-[1px] bg-[#0f0f0f]"></div>
        </div>
        {filteredData.map((menu) => (
          <div key={menu.id} className="flex flex-col space-y-3 text-base md:font-light md:text-lg">
            <Link href={`/product-category/${menu.slug}`}>
              {menu.title} - <span className="text-base">({menu.products.data.length})</span>
            </Link>
            <div className="w-full h-[1px] bg-[#0f0f0f]"></div>
          </div>
        ))}
      </div>

      {/* Mobile Menu (Client-Side) */}
      <ProductCategoryMenuMobile menuData={filteredData} />
    </div>
  );
};

export default ProductCategoryMenu;


