import Image from "next/image"
import PaddingContainer from "./padding-container"


const TopBanner = ({lgImage, mdImage, text1="", text2="", home=false , pageTitle="Atlantic Grease and Lubricant Banner"}) => {
  return (
    // <!--Top Banner-->

   <>
    <div className={`hidden lg:relative lg:flex z-30 w-full  mt-[-85px] ${home ?  "h-[600px]  xl:h-[810px]" : "h-[480px]  xl:h-[500px]" }  `}>
      <div className={`lg:flex flex-col  justify-center text-left     z-20  ${home ?  "pt-28 xl:pt-36 pl-20 xl:pl-24 " : "pl-24 pt-0 xl:pt-24 " } `}> 
        <div className={`text-darkYellow uppercase font-bold font tracking-wide  ${home ?  " text-8xl xl:text-9xl" : "text-6xl xl:text-8xl" } `} >{text1}</div>
        <div className={`text-white uppercase  font-bold tracking-wider   leading-none  ${home ?  " mt-6  text-6xl xl:mt-7  xl:text-6xl" : " mt-2 xl:mt-3 text-4xl xl:text-5xl" }`}> <div dangerouslySetInnerHTML={{ __html: text2 }} /></div>
      </div>

        <Image   src={lgImage} width={1440}  height={home ? 810 : 600}
        className=" absolute w-full object-cover object-center"   alt={pageTitle} />  
    </div>


     {/* show md to  sm */}
    
        <section className="lg:hidden relative z-20 w-full h-auto mt-[-85px] " >
                  <Image  src={mdImage} width={1440} height={569}
                 className="w-full object-cover object-center"   alt={pageTitle}/>
                 <PaddingContainer>
                    <div className={`flex flex-col   ml-10 pb-16   ${home ?  "-mt-16 " : " -mt-28 md:-mt-60" } `}> 
                      <div className={`text-darkYellow uppercase font-semibold font  ${home ?  "text-8xl" : "text-6xl md:text-7xl" } `} >{text1}</div>
                      <div className={`text-white uppercase font-bold  leading-none ${home ?  "text-5xl" : "text-4xl md:text-5xl" }`}><div dangerouslySetInnerHTML={{ __html: text2 }}/> </div>
                   </div>
                  </PaddingContainer>
        </section>
        
      </> 
  )
}

export default TopBanner
