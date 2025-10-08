//contact us page
import PaddingContainer from "../components/layout/padding-container";
import TopBanner from "../components/layout/top-banner";
import { getContactUsPage } from "../data/loader";
import { cache } from 'react';
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import SEOSchema from "../components/elements/seo-schema";
import ContactForm from "../components/elements/contact-form";
import { cachedGetContactUsPage } from "../data/cacheLoader";


export async function generateMetadata(props) {
  const params = await props.params;


  const pageData = await cachedGetContactUsPage();

  const metadataParams = {
    pageTitle: pageData.slug,
    pageSlug: "contact",
    pageDescription: "",
    seoTitle: pageData.seo?.seoTitle ?? "",
    seoDescription: pageData.seo?.seoDescription ?? "",
    rebotStatus: pageData.seo?.preventIndexing ?? false,
    canonicalLinks: pageData.seo?.canonicalLinks ?? "contact",
    dataPublishedTime: pageData.publishedAt,
    category: "",
    image: process.env.NEXT_PUBLIC_ADMIN_BASE_URL + pageData.banner?.mobileBanner?.url,
    imageAlternativeText: pageData.banner?.mobileBanner?.alternativeText ?? pageData.title,
    imageExt: pageData.banner?.mobileBanner?.mime,
  };

  return await generatePageMetadata({ type: "page", path: "", params: metadataParams });
}





const ContactUs = async () => {

  const pageData = await cachedGetContactUsPage();



  return (
    <div >

      {pageData.seo?.schema && <SEOSchema schemaList={pageData.seo?.schema} />}

      {pageData.banner && <TopBanner banner={pageData.banner} />}

      <PaddingContainer  >
        <div className="w-full h-auto topPadding" ></div>
        <h1 className="text-white text-3xl uppercase font-light">{pageData.title}</h1>

        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-10 mt-14">
          {/* contact form */}
          <div className=" w-full text-white ">

            <ContactForm />


          </div>

          {/* map */}
          {pageData.mapUrl &&
            <div className=" w-full   text-white mt-10 md:mt-0  ">
              <iframe
                className="w-full h-96 md:h-80 lg:h-96 xl:h-112 border-0 filter grayscale"
                src={pageData.mapUrl}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          }

        </div>


        <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0 md:space-x-10  mt-20">
          {pageData.fzcTitle &&
            <div className="w-full text-white flex flex-col space-y-3">
              <div className="text-3xl uppercase font-semibold">{pageData.fzcTitle}</div>
              <div className="font-light text-lg max-w-72"><strong className="pr-1 uppercase">Address:</strong> {pageData.fzcAddress}</div>
              <div className="font-light text-lg max-w-72"><strong className="pr-1 uppercase">Phone:</strong>  {pageData.fzcPhone}</div>
              <div className="font-light text-lg max-w-72"><strong className="pr-1 uppercase">Fax:</strong>  {pageData.fzcFax}</div>
              <div className="font-light text-lg max-w-72"><strong className="pr-1 uppercase">Email: </strong> <a href='mailto:{pageData.email}' >{pageData.email} </a></div>
            </div>
          }
          {pageData.llcTitle &&
            <div className="w-full text-white flex flex-col space-y-3  ">
              <div className="text-3xl uppercase font-semibold">{pageData.llcTitle}</div>
              <div className="font-light text-lg max-w-72"><strong className="pr-1 uppercase">Address:</strong> {pageData.llcAddress}</div>
              <div className="font-light text-lg max-w-72"><strong className="pr-1 uppercase">Phone:</strong>  {pageData.lldPhone}</div>
              <div className="font-light text-lg max-w-72"><strong className="pr-1 uppercase">Fax:</strong>  {pageData.llcFax}</div>
              <div className="font-light text-lg max-w-72"><strong className="pr-1 uppercase">Email: </strong> <a href='mailto:{pageData.email}' >{pageData.email} </a></div>
            </div>

          }

        </div>

      </PaddingContainer>


    </div>
  )
}

export default ContactUs
