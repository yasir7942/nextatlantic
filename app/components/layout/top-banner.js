import Image from "next/image"
import PaddingContainer from "./padding-container"


const TopBanner = ({lgImage, mdImage, text1="", text2="" , pageTitle="Atlantic Grease and Lubricant Banner"}) => {
  return (
    // <!--Top Banner-->

   <>
    <div className="  hidden   relative lg:flex z-30 w-full  h-[600px]  xl:h-[810px] mt-[-85px]   ">
      <div className="hiddne   lg:flex flex-col  justify-center text-left  pt-36 pl-24  z-20   "> 
        <div className="text-darkYellow uppercase font-bold font tracking-wide text-7xl xl:text-9xl" >{text1}</div>
        <div className="text-white uppercase font-semibold xl:font-bold text-5xl xl:text-6xl tracking-wider mt-7 leading-none"> <div dangerouslySetInnerHTML={{ __html: text2 }} /></div>
      </div>

        <Image   src={lgImage} width={1440} height={810}
        className=" absolute w-full object-cover object-center"   alt={pageTitle} />  
    </div>

        <section className="  lg:hidden relative z-20 w-full h-auto mt-[-85px] " >
                  <Image class="" src={mdImage} width={1440} height={810}
                 className="w-full object-cover object-center"   alt={pageTitle}/>
                 <PaddingContainer>
                    <div className=" flex flex-col -mt-16 ml-10 pb-16"> 
                      <div className="text-darkYellow uppercase font-semibold font text-8xl" >{text1}</div>
                      <div className="text-white uppercase font-bold text-5xl leading-none"><div dangerouslySetInnerHTML={{ __html: text2 }}/> </div>
                   </div>
                  </PaddingContainer>
        </section>
      </> 
  )
}

export default TopBanner
