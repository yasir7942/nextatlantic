import PaddingContainer from "@/app/components/layout/padding-container"
import ProductCategoryMenu from "@/app/components/layout/product-category-menu"
import TopBanner from "@/app/components/layout/top-banner"
import Image from "next/image"
import { FaDownload } from "react-icons/fa";


const SingleProductPage = ( { params  }) => {




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
            <div class=" w-full md:w-9/12 justify-between lg:w-5/6  flex flex-col bg-[#2a3c46] p-3 md:p-4 pb-3 ">
                {/*   Content area content goes here  */}
                
                 <div className="flex flex-col md:flex-row w-full h-auto p-0 lg:p-8 ">
                     {/* text section */}
                     <div className="w-full md:w-4/6 flex flex-col text-white ">
                           <div className="uppercase font-semibold text-4xl tracking-widest ">Syntectic Power Plus XL-IV </div>
                           <div className="uppercase font-light text-2xl text-gray-300 tracking-widest " >0w-20 ACEA C5 VW 508/509 </div>
                           <div className="text-white font-light text-base mt-5 max-w-xl  pr-5 md:pr-2">
                             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, libero natus labore cupiditate sed est dolorem consequuntur delectus! Facilis assumenda quam ad illo. Et animi fuga tempore saepe, magni nobis.
                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptas odit magnam veritatis nulla suscipit asperiores, labore doloribus delectus facilis, optio in excepturi fugiat porro provident commodi dolor impedit. Voluptate.
                           </div>

                           <div className="mt-10 text-gray-300 text-lg"> Download </div>
                           <div className="w-full h-auto flex  mt-5   pr-0 md:pr-5 lg:pr-16   " >
                                <a href="#" className="w-1/2  "> <div className="  py-1  bg-gray-400 text-black flex justify-center items-center space-x-2 font-light text-center"><div>Techinical Data Sheet </div><FaDownload /></div></a>
                                <a href="#" className="w-1/2  "> <div className="  py-1  bg-white text-black flex justify-center items-center space-x-2 font-light text-center"><div>Techinical Data Sheet </div><FaDownload /></div></a>
                               
                           </div>
                     </div>
                     {/* image section */}
                     <div className="w-full md:w-2/6 items-center ">
                       <div className="  w-full flex flex-col justify-center pt-20 md:pt-13 lg:pt-10 items-center text-center ">
                           <Image className="relative w-44 md:w-36 lg:w-52 text-center" src ="/images/product-image.png" height={1000} width={1000} alt="" />
                           <div class="relative w-full flex justify-center items-start -mt-[1px]   h-[80px] overflow-hidden">
                               <Image className="relative w-44 md:w-36 lg:w-52 text-center object-top transform rotate-180 opacity-30" src ="/images/product-image.png" height={1000} width={1000} alt="" />
                           </div> 

                          <div className="  flex flex-col w-full  h-auto ">  
                             <div className="text-center uppercase mt-10 text-gray-300">Size Available</div>  
                             <div className="flex justify-center items-center   mt-5 space-x-1">
                                 <div className="flex flex-col justify-center items-center">
                                      <div className="w-12 md:w-8 lg:w-12 h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                      <div className="text-center uppercase text-gray-300">1L</div>
                                  </div>
                                  <div className="flex flex-col justify-center items-center">
                                      <div className="w-12 md:w-8 lg:w-12 h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                      <div className="text-center uppercase text-gray-300">4L</div>
                                  </div>

                                  <div className="flex flex-col justify-center items-center">
                                      <div className="w-12 md:w-8 lg:w-12 h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                      <div className="text-center uppercase text-gray-300">5L</div>
                                  </div>

                                  <div className="flex flex-col justify-center items-center">
                                      <div className="w-12 md:w-8 lg:w-12  h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                      <div className="text-center uppercase text-gray-300">20L</div>
                                  </div>

                                  <div className="flex flex-col justify-center items-center">
                                      <div className="w-12 md:w-8 lg:w-12 h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                      <div className="text-center uppercase text-gray-300">200L</div>
                                  </div>

                             </div>

                          </div>
                       </div>
                      </div>

                 </div>
                 {/* Related Product section */}
                <div className="w-full flex flex-col justify-center items-center text-gray-300 mt-5">
                  <div className="uppercase tracking-wider text-xl ">Check Out Other Products In This Range</div>
                   {/* product area */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-12 md:gap-8 lg:gap-20 justify-center items-center mt-10" >
                     <div className="grid flex-col w-full justify-center items-center space-y-2">
                        <Image className="w-36" src ="/images/product-image.png" height={600} width={600} alt="" />
                        <div className="uppercase">Synthetic Top Fleet</div>
                     </div>

                     <div className="grid flex-col w-full justify-center items-center space-y-2">
                        <Image className="w-36" src ="/images/product-image.png" height={600} width={600} alt="" />
                        <div className="uppercase">Synthetic Top Fleet</div>
                     </div>

                     <div className="grid flex-col w-full justify-center items-center space-y-2">
                        <Image className="w-36" src ="/images/product-image.png" height={600} width={600} alt="" />
                        <div className="uppercase">Synthetic Top Fleet</div>
                     </div>

                     <div className="grid flex-col w-full justify-center items-center space-y-2">
                        <Image className="w-36" src ="/images/product-image.png" height={600} width={600} alt="" />
                        <div className="uppercase">Synthetic Top Fleet</div>
                     </div>


                    


                  </div>

                </div>
            
                </div>
            </div>
         




          </PaddingContainer>


    </div>


    )
  }
  
  export default SingleProductPage
  