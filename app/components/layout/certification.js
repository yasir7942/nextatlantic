import Image from "next/image"


const Certification = () => {
    {/* <!-- Certification--> */}
  return (

      <section className="w-full h-auto flex flex-col md:flex-row  p-12 md:-mt-12  pt-0 justify-between items-center  space-x-0 space-y-20  md:space-y-0 md:space-x-20">
    
            <div className=" md:w-1/3">
                <Image className="" src="/images/certificate.png" width={600} height={600} alt="" />
            </div>
            <div className="flex flex-col  md:w-2/3">
                <h2 className="text-darkYellow uppercase pb-4 font-bold text-3xl">OEM APPROVALS</h2>
                <p className="text-white text-base text-left " >At Atlantic Grease and Lubricants, we have secured approvals leading automobile manufacturers. Thus, we demonstrate our commitment  to delivering the best possible outcomes to our customers. Recognizing the significance of quality to our valued customers,  we uphold the utmost standards of excellence in all our endeavors.</p>
                <h2 className="text-darkYellow uppercase   mt-8 pb-4 font-bold text-3xl" >Maintain Stringent Quality Standards</h2>
                <p className="text-white text-base text-left"  >Achieving premium quality standards sits at the core of Atlantic Grease & Lubricants operations. Ensuring the quality of our products  we are committed to systematically testing and monitoring at every stage of production. While manufacturing our products, we make use of cutting-edge technology and premium solutions to ensure the highest quality standards at its maximum potential.</p>
            </div>
    
  </section>
  
    
  )
}

export default Certification
