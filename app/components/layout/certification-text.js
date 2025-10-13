import { getImageUrl } from "@/libs/helper"
import Image from "next/image"
import BodyDataParse from "../elements/data-parse-content"


const CertificateText = ({ heading1, text1, heading2, text2, image }) => {
    {/* <!-- Certification--> */ }
    return (

        <section className="w-full h-auto flex flex-col md:flex-row  p-0 mt-16 2xl:mt-32 2xl:mb-20  pt-0 justify-between items-center  space-x-0 space-y-20  md:space-y-0 md:space-x-20 2xl:space-x-28">

            <div className=" md:w-1/3">

                {image && (<Image quality={100} src={getImageUrl(image.url)} width={600} height={600} alt={image.alternativeText ?? heading1} />)}
            </div>
            <div className="flex flex-col  md:w-2/3">
                <h2 className="text-darkYellow uppercase pb-4 font-bold text-3xl headline">{heading1}</h2>

                <div className="text-white text-base text-left  rich-text summary " >
                    <BodyDataParse content={text1} />
                </div>
                <h2 className="text-darkYellow uppercase   mt-8 pb-4 font-bold text-3xl headline" >{heading2}</h2>
                <div className="text-white text-base text-left  rich-text summary " >
                    <BodyDataParse content={text2} />
                </div>
            </div>

        </section>


    )
}

export default CertificateText
