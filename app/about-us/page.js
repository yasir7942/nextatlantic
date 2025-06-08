import Image from "next/image";
import PaddingContainer from "../components/layout/padding-container";
import TopBanner from "../components/layout/top-banner";
import { getAboutPage } from "../data/loader";
import BodyDataParse from "../components/elements/data-parse-content";
import { getImageUrl } from "@/libs/helper";
import { cache } from 'react';
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import SEOSchema from "../components/elements/seo-schema";
import SpeakableSchema from "../components/elements/speakable-schema";


const cachedGetAboutPage = cache(getAboutPage);
export async function generateMetadata(props) {
    const params = await props.params;


    const pageData = await cachedGetAboutPage();

    const metadataParams = {
        pageTitle: "About Us",
        pageSlug: "about-us",
        pageDescription: pageData.seo?.seoDescription,
        seoTitle: pageData.seo?.seoTitle,
        seoDescription: pageData.seo?.seoDescription,
        rebotStatus: pageData.seo?.preventIndexing,
        canonicalLinks: pageData.seo?.canonicalLinks ?? "about-us",
        dataPublishedTime: pageData.publishedAt,
        category: "",
        image: process.env.NEXT_PUBLIC_ADMIN_BASE_URL + pageData.banner?.mobileBanner?.url,
        imageAlternativeText: pageData.banner?.mobileBanner?.alternativeText ?? pageData.title,
        imageExt: pageData.banner?.mobileBanner?.mime,
    };

    return await generatePageMetadata({ type: "page", path: "", params: metadataParams });
}


const AboutUsPage = async () => {

    const pageData = await cachedGetAboutPage();

    //// console.log("-----------------------about   page--------------------------------------------------");
    //  console.dir(pageData, { depth: null });
    // console.log("---------------------------End-----about ------------------end-----------------------");



    return (
        <div>
            <SpeakableSchema pageTitle={pageData.title} pageUrl={pageData.seo?.canonicalLinks ?? "/about-us"} />
            <SEOSchema schemaList={pageData.seo?.schema} />

            <TopBanner banner={pageData.banner} />

            <PaddingContainer className="flex flex-col   " >




                <div className="flex flex-col md:flex-row justify-center items-center mt-5 topPadding ">
                    <div className="w-full h-auto pr-10 ">
                        <Image className="w-lg block mx-auto " src={getImageUrl(pageData.aboutus.image.url)} width={800} height={500} alt={pageData.aboutus.image.alternativeText || pageData.title} />
                    </div>
                    <div className="text-white font-light    mt-5  leading-snug   pr-5 md:pr-2 rich-text text-2xl" >
                        <h1 className="text-white text-3xl mt-5 md:mt-0 pb-5 md:pb-10 headline  uppercase"> {pageData.aboutus.title}   </h1>
                        <div className=" max-w-7xl summary"> <BodyDataParse content={pageData.aboutus.description} /> </div>
                    </div>
                </div>


                <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between items-stretch md:space-x-3 lg:space-x-10 mt-10">
                    <div className="bg-gray-800 rounded-lg text-white text-lg tracking-wider font-light p-7 md:p-3 lg:p-7 flex-grow flex items-center justify-center">
                        {pageData.ourFocus}
                    </div>
                    <div className="bg-gray-800 rounded-lg text-white text-lg tracking-wider font-light p-7 flex-grow flex items-center justify-center">
                        {pageData.facility}
                    </div>
                    <div className="bg-gray-800 rounded-lg text-white text-lg tracking-wider font-light p-7 flex-grow flex items-center justify-center">
                        {pageData.commitment}
                    </div>
                </div>

            </PaddingContainer>
            {/*  the founder */}
            <div className="w-full h-auto py-10 bg-blue-950 mt-10 text-white ">
                <PaddingContainer  >
                    <div className="flex flex-col lg:flex-row justify-center items-center space-x-0 md:space-x-7 " >
                        <Image className="w-full md:w-96 h-auto" src={getImageUrl(pageData?.founder?.image.url)} width={800} height={500} alt={pageData?.founder?.image.alternativeText || pageData.founder.title} />
                        <div className="flex flex-col space-y-3">
                            <h2 className="text-3xl font-light mt-7 lg:mt-0 headline uppercase">{pageData.founder.title}</h2>
                            <div className="text-white font-light   mt-5   pr-5 md:pr-2 rich-text max-w-4xl summary " >
                                <BodyDataParse content={pageData.founder.description} />
                            </div>
                        </div>
                    </div>
                </PaddingContainer>
            </div>


            <PaddingContainer  >

                <div className="text-white mt-16 ">
                    <h3 className="text-3xl font-light uppercase">Our Values</h3>

                    <div className="flex flex-col md:flex-row md:space-x-10 mt-10 justify-center items-stretch   min-h-full">
                        {pageData.overValues.map((val) => (
                            <div key={val.id} className="flex-1 flex flex-col justify-start items-center text-left md:text-center   min-h-full">
                                <div className="w-full bg-gray-800 py-2 uppercase px-5  text-left md:text-center text-white tracking-wider headline ">{val.title}</div>
                                <div className="w-full text-white font-light pt-5 pb-7 px-5 md:px-0 summary">
                                    {val.description}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>



                <div className="flex flex-col md:flex-row justify-center items-center mt-10   ">
                    <div className=" w-full md:w-1/2  h-auto pr-0 md:pr-10 ">
                        <Image className="w-full md:w-lg block mx-auto " src={getImageUrl(pageData.ourMission.image.url)} width={800} height={500} alt={pageData.aboutus.image.alternativeText || pageData.ourMission.title} />
                    </div>
                    <div className="w-full md:w-1/2  text-white font-light    mt-5  leading-snug   pr-5 md:pr-2 rich-text text-2xl" >
                        <h1 className="text-white text-3xl mt-5 md:mt-0 pb-5 md:pb-10   uppercase headline"> {pageData.ourMission.title}   </h1>
                        <div className="max-w-5xl summary">  <BodyDataParse content={pageData.ourMission.description} /> </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse justify-center items-center mt-5 ">
                    <div className=" w-full md:w-1/2   h-auto pr-0 md:pr-10 ">
                        <Image className="w-lg block mx-auto " src={getImageUrl(pageData.overVisson.image.url)} width={800} height={500} alt={pageData.aboutus.image.alternativeText || pageData.overVisson.title} />
                    </div>
                    <div className=" w-full md:w-1/2   text-white font-light    mt-5  leading-snug pr-10 md:pr-2 rich-text text-2xl" >
                        <h1 className="text-white text-3xl mt-5 md:mt-0 pb-5 md:pb-10   uppercase headline"> {pageData.overVisson.title}   </h1>
                        <div className=" max-w-5xl summary"> <BodyDataParse content={pageData.overVisson.description} /> </div>
                    </div>
                </div>

                <div className="w-full h-16"></div>






            </PaddingContainer>


        </div>
    )
}

export default AboutUsPage
