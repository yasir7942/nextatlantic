import { getImageUrl } from "@/libs/helper"
import Image from "next/image"
import BodyDataParse from "../elements/data-parse-content";


const HomeInfoBlock = ({ heading, description, image }) => {

    const textWidth = image ? "md:w-2/3" : "md:w-full";


    return (

        <section className="w-full h-auto flex flex-col md:flex-row  p-0 mt-16 2xl:mt-32 2xl:mb-20  pt-0 justify-between items-center  space-x-0 space-y-20  md:space-y-0 md:space-x-20 2xl:space-x-28">


            <div className={`flex flex-col ${textWidth}`}>
                <h2 className="text-darkYellow uppercase pb-4 font-bold text-3xl headline">{heading}</h2>

                <div className="text-white text-base text-left summary  rich-text summary " >
                    <BodyDataParse content={description} />
                </div>


            </div>

            {image && (
                <div className=" md:w-1/3">
                    <Image quality={100} src={getImageUrl(image.url)} width={600} height={600} alt={image.alternativeText ?? heading} />
                </div>
            )}
        </section>


    )
}

export default HomeInfoBlock
