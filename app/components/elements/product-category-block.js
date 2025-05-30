import { getImageUrl } from "@/libs/helper"
import Image from "next/image"


const ProductCategoryBlock = ({ colorImage, grayImage, url, text }) => {
  return (


    <div className="relative w-full p-2 aspect-[3/4] max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] xl:max-w-[300px] 2xl:max-w-[450px] overflow-hidden rounded-md group">

      <a href={'/product-category/' + url} >
        <Image className="absolute inset-0 w-full h-full object-cover transition duration-300 ease-in-out" src={getImageUrl(grayImage)} width={500} height={500} alt={text} />
        <Image className="absolute inset-0 w-full h-full object-cover opacity-0 transition duration-300 ease-in-out group-hover:opacity-100" src={getImageUrl(colorImage)} width={500} height={500} alt={text} />
        <div className="text-darkYellow text-xl   lg:text-2xl font-normal absolute bottom-4 left-3  uppercase drop-shadow-[0px_1px_18px_rgba(0,0,0,1)]" >{text}  </div>
      </a>

    </div>

  )
}

export default ProductCategoryBlock
