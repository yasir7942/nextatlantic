import Image from "next/image"
import PaddingContainer from "./padding-container"

const BlogContainer = () => {
  return (
    <div>
      
       <PaddingContainer>


       {/* <!--Latest News --> */}
        <section className="flex flex-col p-12 md:p-0 lg:p-12 mt-4" > 
            {/* <!--heading--> */}
           <div className="flex flex-col">
                  <div className="font-semibold text-6xl md:text-8xl  tracking-widest uppercase text-gray-700 opacity-40 z-10" >Latest News</div>
                  <h3 className="font-extrabold text-4xl uppercase text-darkYellow  tracking-wider -mt-7 ml-5 z-20" >Latest News</h3>
           </div>
           {/* <!--news blocks--> */}
           <div className=" w-full flex flex-col md:flex-row pt-10 md:p-0 md:py-10 lg:p-12 justify-between md:space-x-12 space-y-6 md:space-y-0  ">
                {/* <!--new block--> */}
                <div className="w-full flex flex-col text-white  md:text-left cursor-pointer ">
                      <Image className="w-full " src="/images/blog-1.jpg" width={500} height={500} alt="" />
                       <h2 className="text-darkYellow font-semibold  leading-6 text-lg md:text-base pt-3  text-justify">
                           Get The Most Out Of Your Equipment With The Power Of The Best Grease
                       </h2>
                       <p className="text-lx md:text-sm text-justify">For centuries, people have used lubricants to make machinery run smoothly. Early greases were simple mixtures of animal fats or plant-based oils. The discovery</p>
                       
                </div>

                {/* <!--new block--> */}
                <div className="w-full flex flex-col text-white  md:text-left cursor-pointer  ">
                    <Image className="w-full"   src="/images/blog-2.jpg" width={500} height={500} alt="" />
                    <h2 className="text-darkYellow font-semibold  leading-6 text-lg md:text-base pt-3  text-justify">
                        Get The Most Out Of Your Equipment With The Power Of The Best Grease
                    </h2>
                    <p className="text-lx md:text-sm text-justify">For centuries, people have used lubricants to make machinery run smoothly. Early greases were simple mixtures of animal fats or plant-based oils. The discovery</p>
                    
                  </div>


                  {/* <!--new block--> */}
                  <div className="w-full flex flex-col text-white  md:text-left cursor-pointer  ">
                    <Image className="w-full "  src="/images/blog-3.jpg" width={500} height={500} alt="" />
                    <h2 className="text-darkYellow font-semibold  leading-6 text-lg md:text-base pt-3  text-justify">
                        Get The Most Out Of Your Equipment With The Power Of The Best Grease
                    </h2>
                    <p className="text-lx md:text-sm text-justify">For centuries, people have used lubricants to make machinery run smoothly. Early greases were simple mixtures of animal fats or plant-based oils. The discovery</p>
                    
                  </div>


                  {/* <!--new block--> 
                  <div className="w-full flex flex-col text-white  md:text-left cursor-pointer ">
                    <Image className="w-full "  src="/images/blog-4.jpg" width={500} height={500} alt="" />
                    <h2 className="text-darkYellow font-semibold  leading-6 text-lg md:text-base pt-3  text-justify">
                        Get The Most Out Of Your Equipment With The Power Of The Best Grease
                    </h2>
                    <p className="text-lx md:text-sm text-justify">For centuries, people have used lubricants to make machinery run smoothly. Early greases were simple mixtures of animal fats or plant-based oils. The discovery</p>
                    
                  </div>

                  */}


           </div>
        </section>   
      {/* <!--End Latest News --> */}



       </PaddingContainer>

    </div>
  )
}

export default BlogContainer
