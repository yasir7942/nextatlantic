import { IoMdMenu } from "react-icons/io";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  

const ProductCategoryMenu = () => {
    const numbers = Array.from({ length: 7 }, (_, index) => index + 1);
  return (
    <div>
       <div className="hidden md:flex flex-row md:flex-col space-y-0 space-x-2 md:space-y-4 md:space-x-0  text-gray-300 uppercase ">
                    
                    <div className="fex fex-col space-y-3 text-base  md:font-normal md:text-lg ">
                                <a href="#">Products Categories</a>
                                <div className="w-full h-[1px] bg-[#0f0f0f]"> </div>
                    </div>
                      {/* Loop through the numbers array and render each number */}
                        {numbers.map((number) => (
                              
                              <div className="fex fex-col space-y-3 text-base  md:font-light md:text-lg ">
                                <a href="#">Transmission {number}</a>
                                <div className="w-full h-[1px] bg-[#0f0f0f]"> </div>
                              </div>
                      ))} 

            </div> 

               {/* show in mobile only */ }
            <div className="flex flex-row justify-start md:hidden text-white" > 

                          <Sheet className="bg-orange-500">
                            <SheetTrigger className="flex justify-start items-end space-x-2 " > <IoMdMenu size={20}   /> <div className="font-light">Product Category</div>  </SheetTrigger>
                            <SheetContent side="left" className="w-[250px]" >
                            <SheetHeader>
                                
                                <SheetDescription className="h-screen w-full pb-16   ">
                                  
                                 <div className="w-full h-full overflow-hidden py-3  ">
                                  <div className="w-[218px] h-full overflow-y-auto    " >
                                        <div className="fex fex-col space-y-3 text-left mb-5 text-base font-normal   ">
                                            <a href="#">Products Categories</a>
                                         </div>
                                        {/* Loop through the numbers array and render each number */}
                                          {numbers.map((number) => (
                                                
                                                <div className="fex fex-col text-left pl-2 space-y-3 mt-2 text-base  font-light  ">
                                                  <a href="#">Transmission {number}</a>
                                                  <div className="w-[70%] h-[1px] bg-[#0f0f0f] "> </div>
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
  )
}

export default ProductCategoryMenu
