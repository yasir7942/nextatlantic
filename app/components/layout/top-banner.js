import Image from "next/image"
import PaddingContainer from "./padding-container"


const TopBanner = () => {
  return (
    // <!--Top Banner-->
      <section class="relative z-20 w-full h-auto mt-[-85px] " >
            <Image class="hidden lg:block" src="/images/atlantic-top-banner.png" width={1440} height={810}
           className="w-full object-cover object-center"   alt="" />

                <Image class=" lg:hidden" src="/images/atlantic-top-banner.png" width={1440} height={810}
                className="w-full object-cover object-center"   alt="" />
               <PaddingContainer>
                  <div className=" lg:hidden flex flex-col"> 
                    <div className="text-darkYellow uppercase font-bold text-lg" >Enhance</div>
                    <div className="text-white uppercase font-bold text-lg">The performace <br/> of you vehicle</div>
                  </div>
                </PaddingContainer>
      </section>
      
  )
}

export default TopBanner
