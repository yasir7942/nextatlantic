import Image from "next/image"
import PaddingContainer from "./padding-container"
import {getPostLimitedData} from "@/app/data/loader"
import {getImageUrl} from "@/libs/helper"
import Link from "next/link";

var  baseUrl =process.env.LOCAL_BASE_IMAGE_URL;


const BlogContainer = async () => {



   
  const postData = await getPostLimitedData();
    
    //   console.log("------------------------------Post---Data-222222---------------------------------------");
   
     //  console.dir(postData, { depth:null});
 
    //  console.log("---------------------------End-----------------------end-----------------------");
  



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

                  {
                postData.data.map(post => (
                
                <div key={post.id} className="w-full flex flex-col text-white  md:text-left  ">
                       <Link href={`/blog/${post.slug}`} > 
                        <Image className="w-full " src={getImageUrl(post.featureImage.formats.thumbnail.url)} width={500} height={350} alt={post.title} />
                        <h2 className="text-darkYellow font-semibold  leading-6 text-lg md:text-base pt-3  text-justify headline">
                            {post.title}
                       </h2>
                       <p className="text-lx md:text-sm text-justify summary">{post.seo.seoDesctiption}</p>
                       </Link>
                      
                </div>
                 
               ))}  
                


           </div>
        </section>   
      {/* <!--End Latest News --> */}



       </PaddingContainer>

    </div>
  )
}

export default BlogContainer
