import PaddingContainer from "@/app/components/layout/padding-container"
import ProductCategoryMenu from "@/app/components/layout/product-category-menu";
import SearchBar from "@/app/components/layout/search-bar";
import TopBanner from "@/app/components/layout/top-banner"
import Image from "next/image";

const numbers = Array.from({ length: 12 }, (_, index) => index + 1);
const ProductCategory = ({params}) => {
  return (
    <div>
        <TopBanner lgImage={"/images/product-banner.png"}  mdImage={"/images/product-banner-md.jpg"} text1={"commercial"} text2="Lubricants" />
    
       
       <PaddingContainer>


        <div class="w-full h-auto flex flex-col md:flex-row  ">
        {/*  Left Menu Column  */}
            <div class="w-full md:w-3/12 lg:w-1/6  p-6 md:pl-0  overflow-hidden">
                {/* <!-- Menu content goes here   */}
                <ProductCategoryMenu />
            </div>

            {/*  Content Area   */}
            <div class=" w-full md:w-9/12 lg:w-5/6  flex flex-col bg-[#2a3c46] p-3 md:p-4 pb-3 ">
                {/*   Content area content goes here  */}
                <SearchBar />

                
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 mt-3   ">
                       
                {numbers.map((number) => (
                        <div class=" pt-0 mt-10 relative text-center flex flex-col    justify-center">
                        
                          <div className="w-full    flex justify-center ">
                             <a href="/product/Syntech-Echo-Venture-Syntech"> <Image className="relative w-28 text-center" src ="/images/product-image.png" height={400} width={400} alt="" /> </a>
                          </div>
                            
                           <h2 className="uppercase text-lg text-burnYellow mt-3 leading-1"><a href="" >Syntech Echo Venture Syntech </a> </h2>
                           <p className="text-gray-200 xl:text-xl  text-base font-light  leading-5">0w-20</p>
                           <p className="text-gray-200 xl:text-xl  text-base font-light  leading-5">API SN ILSAC GF-5</p>
                           <p className="text-gray-200 xl:text-xl text-base font-light  leading-5">API SN ILSAC GF-5</p>
                           <p className="text-gray-200 xl:text-xl  text-base font-light  leading-5">ACEA A1/B1, A5/B5</p>
                           <a href="/product/Syntech-Echo-Venture-Syntech" className="uppercase w-full  text-center p-x-5 bg-burnYellow text-black mt-2"> View </a>
                            
                           
                        </div>
                        
                      ))} 
                        
              </div>


                </div>
            </div>
         

          </PaddingContainer>


    </div>

   
  )
}

export default ProductCategory
