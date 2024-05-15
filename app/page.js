import Image from "next/image";
import TopBanner from "./components/layout/top-banner";
import PaddingContainer from "./components/layout/padding-container";
import BlogContainer from "./components/layout/blog-container";
import Certification from "./components/layout/certification";
import { flattenAttributes } from "@/lib/utils";
import { getStrapiData } from "@/lib/helper";

 

export default async function Home() {

  
  
  const strapiData = await getStrapiData("home-page", true);
   console.dir(strapiData, { depth:null});

  return (
    <div className="bg-backgroundColor">
      <TopBanner lgImage={"/images/atlantic-top-banner.png"}   mdImage={"/images/top-banner-md.jpg"} home text1={"Enhance"} text2="The performace <br/> of you vehicle" />


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

      <Certification/>
       

    </PaddingContainer>
   
   <BlogContainer /> 
  


    <br/>



  </div>
      
  );
}
