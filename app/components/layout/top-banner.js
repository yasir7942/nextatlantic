import Image from "next/image"
import PaddingContainer from "./padding-container"
import { getImageUrl } from "@/libs/helper";
import siteConfig from "@/config/site";


const TopBanner = ({ banner = "", home = false }) => {



  if (!banner || banner == null || banner.length == 0) return <div className=" mt-32"></div>

  // image schema for seo
  const jsonLd =
  {
    "@context": "https://schema.org/",
    "@type": "ImageObject",
    "contentUrl": getImageUrl(banner?.webBanner?.url),
    "license": siteConfig.imageObject.license,
    "acquireLicensePage": siteConfig.imageObject.acquireLicensePage,
    "creditText": siteConfig.imageObject.creditText,
    "creator": {
      "@type": "Organization",
      "name": siteConfig.imageObject.creatorName,
    },
    "copyrightNotice": siteConfig.imageObject.copyrightNoticeBanner
  };





  return (
    // <!--Top Banner-->

    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className={`hidden lg:relative lg:flex   w-full  z-40  mt-[-85px] ${home ? "h-[600px]  xl:h-[810px]" : "h-[480px]  xl:h-[500px]"}  `}>
        <div className={`lg:flex flex-col  justify-center text-left largeScreenPadding 2xl:mx-60   z-20  ${home ? "pt-28 xl:pt-36 pl-20 xl:pl-24 2xl:pl-0 " : "pl-24 pt-0 xl:pt-24 2xl:pl-0 "} `}>
          <div className={`text-darkYellow uppercase font-bold font tracking-wide  ${home ? " text-8xl xl:text-9xl" : "text-6xl xl:text-8xl"} `} >{banner.title}</div>
          <div className={`text-white uppercase  font-bold tracking-wider   leading-none  ${home ? " mt-6  text-6xl xl:mt-7  xl:text-6xl" : " mt-2 xl:mt-3 text-4xl xl:text-5xl"}`}> <div dangerouslySetInnerHTML={{ __html: banner.subTitle }} /></div>
        </div>

        {banner?.webBanner?.url && banner?.webBanner?.url !== "" ? (
          <Image
            priority
            src={getImageUrl(banner.webBanner.url)}
            width={1440}
            height={home ? 810 : 600}
            className=" absolute w-full object-cover object-center" quality={100} alt={banner.alternativeText ?? "Atlantic Grease and Lubricants"} />

        ) : null}


      </div>


      {/* show md to  sm */}

      <section className="lg:hidden relative z-20 w-full h-auto mt-[-85px] " >
        {banner?.mobileBanner?.url && banner?.mobileBanner?.url !== "" ? (
          <Image src={getImageUrl(banner.mobileBanner.url)} width={800} height={569} className="w-full object-cover object-center" alt={banner.alternativeText ?? "Atlantic Grease and Lubricants"} />
        ) : null}

        <PaddingContainer>
          <div className={`flex flex-col   ml-0 pb-16   ${home ? "-mt-16 " : " -mt-28 md:-mt-60"} `}>
            <div className={`text-darkYellow uppercase font-semibold font  ${home ? " text-6xl md:text-8xl" : "text-4xl md:text-6xl"} `} >{banner.title}</div>
            <div className={`text-white uppercase font-bold  leading-none ${home ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}><div dangerouslySetInnerHTML={{ __html: banner.subTitle }} /> </div>
          </div>
        </PaddingContainer>
      </section>

    </>
  )
}

export default TopBanner
