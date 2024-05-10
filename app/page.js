import Image from "next/image";
import TopBanner from "./components/layout/top-banner";
import PaddingContainer from "./components/layout/padding-container";
import BlogContainer from "./components/layout/blog-container";

export default function Home() {
  return (
    <div>
      <TopBanner />



      {/* <!--Product Catrgories Icons--> */}
      <PaddingContainer >
      <section className="  w-full h-auto grid grid-cols-3 gap-5 md:gap-4 md:flex md:flex-row  justify-between  md:-mt-33    relative z-50  ">
            <a  href="#" className="flex flex-col text-center items-center ">
              <Image className="w-24 md:w-25 text-center" src="/images/engine-oil.svg" width={250} height={250} alt="" />
              <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Engine Oil</h2>
            </a>
            <a  href="#"  className="flex flex-col text-center items-center ">
              <Image className="w-24 md:w-25" src="/images/aviation.svg" width={250} height={250} alt="" />
              <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Avaition</h2>
            </a>
            <a  href="#"  className="flex flex-col text-center items-center">
              <Image className="w-24 md:w-25" src="/images/Steering.svg" width={250} height={250} alt="" />
              <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Steering</h2>
            </a>
            <a  href="#"  className="flex flex-col text-center items-center">
              <Image className="w-24 md:w-25 " src="/images/transmission.svg" width={250} height={250} alt="" />
              <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Transmission</h2>
            </a>
           

            <a  href="#"  className="flex flex-col text-center items-center">
              <Image className="w-24 md:w-25" src="/images/brake-fluid.svg" width={250} height={250} alt="" />
              <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Brake Fliud</h2>
            </a>

            <a  href="#"  className="flex flex-col text-center items-center">
              <Image className="w-24 md:w-25" src="/images/marine.svg" width={250} height={250} alt="" />
              <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Marine Oil</h2>
            </a>

            <a  href="#"  className="flex flex-col text-center items-center">
              <Image className="w-24 md:w-25" src="/images/grease.svg" width={250} height={250} alt="" />
              <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Grease</h2>
            </a>
      </section>
    {/* <!--End Product Catrgories Icons--> */}



    {/* <!-- media section--> */}
      <section className="w-full h-auto flex flex-col md:flex-row mt-20 p-12 pb-0 justify-between  space-x-0 space-y-20 md:space-y-0 md:space-x-20">
    
        <div className="flex items-center md:-mt-10">
            <Image className="" src="/images/video-image.jpg" width={600} height={600} alt="" />
        </div>
        <div>
            <Image className="" src="/images/atlantic-products.png" width={600} height={600} alt="" />
        </div>
        
      </section>
      {/* <!-- end media section--> */}


       {/* <!-- Certification--> */}
       <section className="w-full h-auto flex flex-col md:flex-row  p-12 md:-mt-12  pt-0 justify-between  space-x-0 space-y-20  md:space-y-0 md:space-x-20">
    
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
      {/* <!-- end Certificationn--> */}

    </PaddingContainer>
   
   <BlogContainer /> 
  


    <br/>



  </div>
      
  );
}
