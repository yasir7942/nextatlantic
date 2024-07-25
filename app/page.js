  //Home Page
  
import Image from "next/image";
import TopBanner from "./components/layout/top-banner";
import PaddingContainer from "./components/layout/padding-container";
import BlogContainer from "./components/layout/blog-container";
import { getHomePage } from "@/app/data/loader"
import SpeakableSchema from "./components/elements/speakable-schema";
import CertificateText from "./components/layout/certification-text";
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import { cache } from 'react';
import SEOSchema from "./components/elements/seo-schema";
import Link from "next/link";
import siteConfig from "@/config/site";


const cachedGetHomePage = cache(getHomePage);
export async function generateMetadata({ params }) {
 
 
  const pageData = await cachedGetHomePage(); 
    
  const metadataParams = {
    pageTitle:  siteConfig.organizatioName,
    pageSlug: "/",
    pageDescription: siteConfig.description,
    seoTitle: pageData.seo?.seoTitle,
    seoDescription: pageData.seo?.seoDescription,
    rebotStatus: pageData.seo?.preventIndexing,
    canonicalLinks: pageData.seo?.canonicalLinks?? "/",
    dataPublishedTime: pageData.publishedAt,
    category: "",
    image: pageData.banner?.mobileBanner?.url,
    imageAlternativeText:  pageData.banner?.mobileBanner?.alternativeText ?? pageData.title,
    imageExt:  pageData.banner?.mobileBanner?.mime,
  };

  return await generatePageMetadata({ type: "page", path: "", params: metadataParams });
}

export default async function Home() {



  const homeData = await cachedGetHomePage();

  //  console.log("-----------------------home page--------------------------------------------------");
  //  console.dir(homeData, { depth:null});
  //  console.log("---------------------------End-----------------------end-----------------------");


  return (
    <div className="bg-backgroundColor">

      <SpeakableSchema pageTitle={homeData.title} pageUrl={homeData.seo?.canonicalLinks?? "/"}  />
      <SEOSchema schemaList={homeData.seo?.schema}  />
      <TopBanner banner={homeData.banner} home />


      {/* <!--Product Catrgories Icons--> */}
      <PaddingContainer >
        <section className="  w-full h-auto grid grid-cols-3 gap-5 md:gap-4 md:flex md:flex-row  justify-between  md:-mt-33    relative z-50  ">
          <a href="#" className="flex flex-col text-center items-center ">
            <Image className="w-24 md:w-25 text-center" src="/images/engine-oil.svg" width={250} height={250} alt="" />
            <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Engine Oil</h2>
          </a>
          <a href="#" className="flex flex-col text-center items-center ">
            <Image className="w-24 md:w-25" src="/images/aviation.svg" width={250} height={250} alt="" />
            <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Avaition</h2>
          </a>
          <a href="#" className="flex flex-col text-center items-center">
            <Image className="w-24 md:w-25" src="/images/steering.svg" width={250} height={250} alt="" />
            <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Steering</h2>
          </a>
          <a href="#" className="flex flex-col text-center items-center">
            <Image className="w-24 md:w-25 " src="/images/transmission.svg" width={250} height={250} alt="" />
            <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Transmission</h2>
          </a>


          <a href="#" className="flex flex-col text-center items-center">
            <Image className="w-24 md:w-25" src="/images/brake-fluid.svg" width={250} height={250} alt="" />
            <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Brake Fliud</h2>
          </a>

          <a href="#" className="flex flex-col text-center items-center">
            <Image className="w-24 md:w-25" src="/images/marine.svg" width={250} height={250} alt="" />
            <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Marine Oil</h2>
          </a>

          <a href="#" className="flex flex-col text-center items-center">
            <Image className="w-24 md:w-25" src="/images/grease.svg" width={250} height={250} alt="" />
            <h2 className="uppercase text-md font-bold text-darkYellow mt-2">Grease</h2>
          </a>
        </section>
        {/* <!--End Product Catrgories Icons--> */}



        {/* <!-- media section--> */}
        <section className="w-full h-auto flex flex-col md:flex-row mt-20 p-12 pb-0 justify-evenly space-x-0 space-y-20 md:space-y-0 md:space-x-24">

          <div className="flex  items-center md:-mt-10  ">
          <a className="" href="https://www.youtube.com/watch?v=Ofmc3uhbwyk&t=67s"  rel="noopener noreferrer" target="_blank"> 
             <Image   src="/images/video-image.jpg" width={600} height={500} alt="Atlantic Grease and Lubricants Video" loading="lazy" /> </a>
          </div>
          <div >
            <Image   src="/images/atlantic-products.png" width={600} height={500} alt="Atlantic Product Range" loading="lazy" />
          </div>

        </section>
        {/* <!-- end media section--> */}


        <CertificateText heading1={homeData.bodyHeading1} text1={homeData.bodyText1} heading2={homeData.bodyHeading2} text2={homeData.bodyText2} />

      </PaddingContainer>

      <BlogContainer />

      <br />



    </div>

  );
}
