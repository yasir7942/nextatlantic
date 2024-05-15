import Image from "next/image"
import PaddingContainer from "../components/layout/padding-container"
import TopBanner from "../components/layout/top-banner"
import ProductCategoryBlock from "../components/elements/product-category-block"
import Certification from "../components/layout/certification"



const Products = () => {
  return (
    <div>
      <TopBanner lgImage={"/images/product-banner.png"}  mdImage={"/images/product-banner-md.jpg"} text1={"Enhance"} text2="The performace <br/> of you vehicle" />
   
   {/* product category container */}
    <section>
      <PaddingContainer>
        <div className="flex flex-col space-y-2 md:space-y-3  ">
            <div className="grid grid-cols-2 gap-2 md:gap-0 md:flex md:flex-row justify-center space-x-0 md:space-x-2 lg:space-x-3 relative  z-50 "> 
              <ProductCategoryBlock colorImage={"/images/engine-oil-category.png"} grayImage={"/images/engine-oil-category-BW.png"} url="/product-category/engine-oil" text="Engine Oil" />
              <ProductCategoryBlock colorImage={"/images/transmission-fluid-category-BW.png"} grayImage={"/images/transmission-fluid-category.png"} url="" text="Transmission" />
              <ProductCategoryBlock colorImage={"/images/brake-fluid.png"} grayImage={"/images/brake-fluid-BW.png"} url="" text="Brake Fluid" />
              <ProductCategoryBlock colorImage={"/images/industerial-fluid-category.png"} grayImage={"/images/industerial-fluid-category-BW.png"} url="" text="Engine Oil" />
            </div>

            
            <div className="grid grid-cols-2 gap-2 md:gap-0 md:flex md:flex-row justify-center space-x-0 md:space-x-2 lg:space-x-3 relative  z-50 "> 
              <ProductCategoryBlock colorImage={"/images/coolant.png"} grayImage={"/images/coolant-BW.png"} url="" text="Coolant" />
              <ProductCategoryBlock colorImage={"/images/steering-fluid-category.png"} grayImage={"/images/steering-fluid-category-WB.png"} url="" text="Steering" />
              <ProductCategoryBlock colorImage={"/images/marine-oil-category-BW.png"} grayImage={"/images/marine-oil-category.png"} url="" text="Marine" />
              <ProductCategoryBlock colorImage={"/images/grease-category.png"} grayImage={"/images/grease-category-BW.png"} url="" text="Grease" />
            </div>
        </div>
      </PaddingContainer>

          <div className="relative  w-full h-[855px] justify-center items-center ">
              <Image className="absolute inset-0 w-full h-full object-cover" src="/images/product-banner2.png" width={1600} height={800} alt="" />
                <a href="/" className="absolute w-16 h-16  inset-0 left-32 md:left-40 top-[160px] md:top-[480px] z-50">
              <Image className="w-16 h-16  " src="/images/white-play-button.png" width={1600} height={500} alt="" />
            </a>
          </div>

     <Certification />
    </section>
    </div>
  )
}

export default Products
