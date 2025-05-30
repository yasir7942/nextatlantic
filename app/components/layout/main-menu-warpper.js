import { getProductCategoryLeftMenu } from "@/app/data/loader";

import MenuList from "./menu-list";

const MainMenuWrapper = async ({ productCategory }) => {


    const productCategoryData = await productCategory;


    return (
        <div>
            {/*  <SideAccordion Categories={productCategory} />  */}

            <MenuList categories={productCategoryData} />
        </div>
    )
}

export default MainMenuWrapper
