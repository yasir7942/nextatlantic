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

import siteConfig from "@/config/site";
import HomeProductCategory from "./components/layout/home-product-category";



const cachedGetHomePage = cache(getHomePage);
export async function generateMetadata({ params }) {


  const pageData = await cachedGetHomePage();

  const metadataParams = {
    pageTitle: pageData.title,
    pageSlug: "/",
    pageDescription: siteConfig.description,
    seoTitle: pageData.seo?.seoTitle,
    seoDescription: pageData.seo?.seoDescription,
    rebotStatus: pageData.seo?.preventIndexing,
    canonicalLinks: pageData.seo?.canonicalLinks ?? "/",
    dataPublishedTime: pageData.publishedAt,
    category: "",
    image: process.env.NEXT_PUBLIC_ADMIN_BASE_URL + pageData.banner?.mobileBanner?.url,
    imageAlternativeText: pageData.banner?.mobileBanner?.alternativeText ?? pageData.title,
    imageExt: pageData.banner?.mobileBanner?.mime,
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

      <SpeakableSchema pageTitle={homeData.title} pageUrl={homeData.seo?.canonicalLinks ?? "/"} />
      <SEOSchema schemaList={homeData.seo?.schema} />
      <TopBanner banner={homeData.banner} home />


      {/* <!--Product Catrgories Icons--> */}
      <PaddingContainer >

        <HomeProductCategory />



        {/* <!-- media section--> */}
        <section className="flex flex-col md:flex-row w-full h-auto mt-20 p-0 pb-0 2xl:mt-52 justify-between items-center space-x-0 space-y-0">
          <div className="w-full h-auto md:w-1/2 lg:w-1/2 flex justify-center">
            <iframe
              className="w-[100%] h-[350px] md:w-[100%] md:h-[350px] lg:w-[100%] lg:h-[400px] 2xl:h-[580px]"
              src="https://www.youtube.com/embed/9xmuqQjRMEg?autoplay=1&mute=1&modestbranding=0&showinfo=0&controls=0&rel=0"
              title="YouTube Video"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/2 p-4 flex justify-center items-center">
            <Image
              src="/images/atlantic-products.png"
              className="w-auto h-[350px] md:h-[300px] lg:h-[400px] "
              width={600}
              height={500}
              alt="Atlantic Product Range"
            />
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
