
import { getProductCategoryForHome } from "@/app/data/loader";
import { getImageUrl } from "@/libs/helper";
import Image from "next/image"



const HomeProductCategory = async () => {

  const categoryData = await getProductCategoryForHome();



  console.log("-------------------------parent-----category---Data----------------------------------------");

  console.dir(categoryData, { depth: null });

  console.log("---------------------------End-----------------------end-----------------------");


  return (

    <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-4   md:-mt-30   2xl:mt-64  p-4">
      {categoryData.data.map(cat => (
        <a
          href={`/product-category/${cat.slug}`}
          key={cat.id}
          className="flex flex-col items-center text-center   p-4"
        >
          <Image
            className="w-24 h-24 object-contain"
            src={getImageUrl(cat.icon.url)}
            width={100}
            height={100}
            alt={cat.title}
          />
          <h2 className="uppercase text-md font-bold text-darkYellow mt-2">{cat.title}</h2>
        </a>
      ))}
    </section>




    /*
    <section className="  w-full h-auto grid grid-cols-3 gap-5 md:gap-4 md:flex md:flex-row  justify-between  md:-mt-30  xl:-mt-30  2xl:mt-64 relative z-50 bg-purple-800  ">

      {categoryData.data.map(cat => (

        <a href={`/product-category/${cat.slug}`} key={cat.id} className="flex flex-col text-center items-center bg-red-600">
          <Image className="w-24 md:w-25 text-center" src={getImageUrl(cat.icon.url)} width={250} height={250} alt={cat.title} />
          <h2 className="uppercase text-md font-bold text-darkYellow mt-2">{cat.title}</h2>
        </a>
      ))}

    </section>   */

  )
}

export default HomeProductCategory
