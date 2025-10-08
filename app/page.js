//Home Page


import TopBanner from "./components/layout/top-banner";
import PaddingContainer from "./components/layout/padding-container";
import BlogContainer from "./components/layout/blog-container";

import SpeakableSchema from "./components/elements/speakable-schema";
import CertificateText from "./components/layout/certification-text";
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";

import SEOSchema from "./components/elements/seo-schema";

import siteConfig from "@/config/site";
import HomeProductCategory from "./components/layout/home-product-category";
import SearchBar from "./components/layout/search-bar";

import ImageTextBlock from "./components/layout/home-image-text-block";
import { cachedGetGetHomePage } from "./data/cacheLoader";




export async function generateMetadata(props) {
  const params = await props.params;


  const pageData = await cachedGetGetHomePage();

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



  const homeData = await cachedGetGetHomePage();
  /*
    console.log("-----------------------home page--------------------------------------------------");
    console.dir(homeData, { depth: null });
    console.log("---------------------------End-----------------------end-----------------------");
    console.log(homeData.imageText[1].__component)
  */
  return (
    <div className="bg-backgroundColor">

      <SpeakableSchema pageTitle={homeData.title} pageUrl={homeData.seo?.canonicalLinks ?? "/"} />
      <SEOSchema schemaList={homeData.seo?.schema} />
      <TopBanner banner={homeData.banner} home />


      {/* <!--Product Catrgories Icons--> */}
      <PaddingContainer >

        <HomeProductCategory />

        <div className="   w-full mt-4   ">
          <SearchBar dataType="products" />
        </div>

        {/* <!-- media section--> */}
        <section className="flex flex-col md:flex-row w-full h-auto mt-10 p-0 pb-0 2xl:mt-52 justify-between items-center md:items-stretch">
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

          {/* allow this column to match the iframe column’s height */}
          <div className="w-full md:w-1/2 lg:w-1/2 p-4 flex md:self-stretch ">
            {/* make the ImageTextBlock fill and center inside */}
            <div className="flex-1 flex items-center justify-center">
              <ImageTextBlock homeData={homeData} />
            </div>
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
