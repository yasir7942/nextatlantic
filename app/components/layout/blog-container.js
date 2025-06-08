import Image from "next/image"
import { getPostLimitedData } from "@/app/data/loader"
import { getImageUrl } from "@/libs/helper"
import moment from 'moment';
import PaddingContainer from "./padding-container";



const BlogContainer = async () => {

  const postData = await getPostLimitedData();

  // console.log("------------------------------Post---Data-222222---------------------------------------");
  // console.dir(postData, { depth:null});

  /*postData.data.map(post => {
   // console.log(post.PostDate);
  });*/
  // console.log("---------------------------End-----------------------end-----------------------");

  return (
    <div>




      {/* <!--Latest News --> */}
      <section className="flex flex-col p-12 md:p-0 lg:p-12 mt-4 largeScreenPadding 2xl:mx-60" >

        {/* <!--heading--> */}
        <div className="flex flex-col ">
          <div className="font-semibold text-6xl md:text-8xl  tracking-widest uppercase text-[#4F5256] opacity-80 z-10" >Latest News</div>
          <h3 className="font-extrabold text-4xl uppercase text-darkYellow  tracking-wider -mt-7 ml-5 z-20" >Latest News</h3>
        </div>


        {/* <!--news blocks--> */}
        <div className=" w-full flex flex-col md:flex-row pt-10 md:p-0 md:py-10 lg:p-12 justify-between md:space-x-12 space-y-6 md:space-y-0  ">
          {/* <!--new block--> */}

          {
            postData.data.map(post => (

              <div key={post.id} className="w-full flex flex-col text-white  md:text-left  ">
                <a href={`/blog/${post.slug}`} >
                  <Image className="w-full " src={getImageUrl(post.featureImage.url)} quality={100} width={500} height={350} alt={post.title} />
                  <h2 className="text-darkYellow font-semibold  leading-6 text-lg md:text-base pt-3  text-justify headline">
                    {post.title}
                  </h2>
                  <p className='text-sm text-gray-300 font-light'> {moment(post.PostDate).format('MMMM D, YYYY')}</p>
                  <p className="text-lx md:text-sm text-justify summary">
                    {post.seo?.seoDesctiption ? post.seo.seoDesctiption.split(" ").length > 25
                      ? post.seo.seoDesctiption.split(" ").slice(0, 25).join(" ") + "..."
                      : post.seo.seoDesctiption
                      : ""}
                  </p>
                </a>

              </div>

            ))}



        </div>

      </section>
      {/* <!--End Latest News --> */}



    </div>
  )
}

export default BlogContainer
