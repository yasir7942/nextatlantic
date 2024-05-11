import Image from "next/image"
import PaddingContainer from "../components/layout/padding-container"
import TopBanner from "../components/layout/top-banner"
import ProductCategoryBlock from "../components/elements/product-category-block"
import Certification from "../components/layout/certification"



const Products = () => {
  return (
    <div>
      <TopBanner lgImage={"/images/product-category-banner.png"}  mdImage={"/images/top-banner-md.jpg"} text1={"Enhance"} text2="The performace <br/> of you vehicle" />
   
   {/* product category container */}
    <section>
      <PaddingContainer>
        <div className="flex flex-col space-y-6 md:space-y-4 lg:space-y-4 xl:space-y-9  ">
            <div className="grid grid-cols-2 gap-6 md:gap-0 md:flex md:flex-row justify-between space-x-0  md:space-x-2 relative  z-50"> 
              <ProductCategoryBlock colorImage={""} grayImage={""} url="" text="Engine Oil" />
              <ProductCategoryBlock colorImage={""} grayImage={""} text="Engine Oil" />
              <ProductCategoryBlock colorImage={""} grayImage={""} text="Engine Oil" />
              <ProductCategoryBlock colorImage={""} grayImage={""} text="Engine Oil" />
            </div>

            <div className="grid grid-cols-2 gap-6 md:gap-0 md:flex md:flex-row justify-between space-x-0  md:space-x-2 relative  z-50"> 
              <ProductCategoryBlock colorImage={""} grayImage={""} url="" text="Engine Oil" />
              <ProductCategoryBlock colorImage={""} grayImage={""} text="Engine Oil" />
              <ProductCategoryBlock colorImage={""} grayImage={""} text="Engine Oil" />
              <ProductCategoryBlock colorImage={""} grayImage={""} text="Engine Oil" />
            </div>
        </div>
      </PaddingContainer>

     <div className="relative  w-full h-[855px] justify-center items-center ">
        <Image className="absolute inset-0 w-full h-full object-cover" src="/images/product-banner2.png" width={1600} height={800} alt="" />
       <a href="/" className="absolute w-16 h-16  inset-0 left-32 md:left-40 top-[160px] md:top-[480px] z-50">
         <Image className="w-16 h-16  " src="/images/white-play-button.png" width={1600} height={800} alt="" />
      </a>
     </div>

     <Certification />
    </section>
    </div>
  )
}

export default Products
