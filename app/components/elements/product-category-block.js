import Image from "next/image"


const ProductCategoryBlock = ({colorImage, grayImage, url, text}) => {
  return (
    
      
      <div className=" relative w-50 h-64  md:w-64 md:h-72 lg:w-72 lg:h-80 xl:w-80 xl:h-96 bg-gray-500 rounded-md overflow-hidden group ">
                <a href="/" >
                    <Image className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:filter-none" src="/images/engine-oil-category.png" width={500} height={500} alt="" />
                 <div className="text-darkYellow text-3xl font-normal absolute bottom-4 right-3 shadow-black drop-shadow-2xl" >Engine Oil</div>
                </a>
     </div>
     
  )
}

export default ProductCategoryBlock
