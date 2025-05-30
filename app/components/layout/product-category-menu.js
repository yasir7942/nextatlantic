


import Link from "next/link";
import ProductCategoryMenuMobile from "./product-category-menu-mobile";
import { getProductCategoryLeftMenu } from "@/app/data/loader";
import ProductCategoryManuDesktop from "./product-category-menu-desktop";


const ProductCategoryMenu = async ({ Parent }) => {
  const parentCategorySlug = await Parent;


  const productCategory = await getProductCategoryLeftMenu();
  // Ensure menuData.data is always an array
  /* const filteredData = Array.isArray(productCategory.data)
     ? productCategory.data.map(parent => {
       const filteredChildren = Array.isArray(parent.child)
         ? parent.child.filter(child => child.products?.data?.length > 0)
         : [];
 
       return {
         ...parent,
         child: filteredChildren,
       };
     })
     : [];   */

  const filteredData = productCategory.data;
  /* console.log("Raw menuData:", filteredData);
   console.log("menuData.data Type:", typeof filteredData.data);
   console.log("menuData.data isArray:", Array.isArray(filteredData.data));
 */

  return (
    <div>
      {/* Desktop Menu */}

      <ProductCategoryManuDesktop MenuData={filteredData} Selected={parentCategorySlug} />
      {/* Mobile Menu (Client-Side) */}
      <ProductCategoryMenuMobile MenuData={filteredData} Selected={parentCategorySlug} />
    </div>
  );
};

export default ProductCategoryMenu;


