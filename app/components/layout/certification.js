import Image from "next/image"


const Certification = ({heading1, text1, heading2, text2}) => {
    {/* <!-- Certification--> */}
  return (

      <section className="w-full h-auto flex flex-col md:flex-row  p-12 md:-mt-12  pt-0 justify-between items-center  space-x-0 space-y-20  md:space-y-0 md:space-x-20">
    
            <div className=" md:w-1/3">
                <Image className="" src="/images/certificate.png" width={600} height={600} alt="" />
            </div>
            <div className="flex flex-col  md:w-2/3">
                <h2 className="text-darkYellow uppercase pb-4 font-bold text-3xl">{heading1}</h2>
                <p className="text-white text-base text-left " >{text1}</p>
                <h2 className="text-darkYellow uppercase   mt-8 pb-4 font-bold text-3xl" >{heading2}</h2>
                <p className="text-white text-base text-left"  >{text2}</p>
            </div>
    
  </section>
  
    
  )
}

export default Certification
