import Image from "next/image"
import PaddingContainer from "./padding-container"
import {getImageUrl} from "@/libs/helper";
import siteConfig from "@/config/site";


const TopBanner = ({ banner="" , home=false }) => {


  // image schema for seo
  const jsonLd =
  {
      "@context": "https://schema.org/",
      "@type": "ImageObject",
      "contentUrl": getImageUrl(banner?.webBanner?.url),
      "license":  siteConfig.imageObject.license,
      "acquireLicensePage": siteConfig.imageObject.acquireLicensePage,
      "creditText": siteConfig.imageObject.creditText,
      "creator": {
        "@type": "Organization",
        "name": siteConfig.imageObject.creatorName,
       },
      "copyrightNotice": siteConfig.imageObject.copyrightNoticeBanner
    };


  
   if(!banner || banner.length == 0) return <div className=" mt-32"></div>
  
  return (
  // <!--Top Banner-->

   <>
        <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

    <div className={`hidden lg:relative lg:flex z-30 w-full  mt-[-85px] ${home ?  "h-[600px]  xl:h-[810px]" : "h-[480px]  xl:h-[500px]" }  `}>
      <div className={`lg:flex flex-col  justify-center text-left     z-20  ${home ?  "pt-28 xl:pt-36 pl-20 xl:pl-24 " : "pl-24 pt-0 xl:pt-24 " } `}> 
        <div className={`text-darkYellow uppercase font-bold font tracking-wide  ${home ?  " text-8xl xl:text-9xl" : "text-6xl xl:text-8xl" } `} >{banner.title}</div>
        <div className={`text-white uppercase  font-bold tracking-wider   leading-none  ${home ?  " mt-6  text-6xl xl:mt-7  xl:text-6xl" : " mt-2 xl:mt-3 text-4xl xl:text-5xl" }`}> <div dangerouslySetInnerHTML={{ __html: banner.subTitle }} /></div>
      </div>

        <Image   src={getImageUrl(banner.webBanner.url)} width={1440}  height={home ? 810 : 600}
        className=" absolute w-full object-cover object-center"   alt={banner.alternativeText} />  
    </div>


     {/* show md to  sm */}
    
        <section className="lg:hidden relative z-20 w-full h-auto mt-[-85px] " >
                  <Image  src={getImageUrl(banner.mobileBanner.url)} width={1440} height={569}
                 className="w-full object-cover object-center"   alt={banner.alternativeText}/>
                 <PaddingContainer>
                    <div className={`flex flex-col   ml-10 pb-16   ${home ?  "-mt-16 " : " -mt-28 md:-mt-60" } `}> 
                      <div className={`text-darkYellow uppercase font-semibold font  ${home ?  "text-8xl" : "text-6xl md:text-7xl" } `} >{banner.title}</div>
                      <div className={`text-white uppercase font-bold  leading-none ${home ?  "text-5xl" : "text-4xl md:text-5xl" }`}><div dangerouslySetInnerHTML={{ __html: banner.subTitle }}/> </div>
                   </div>
                  </PaddingContainer>
        </section>
        
      </> 
  )
}

export default TopBanner
