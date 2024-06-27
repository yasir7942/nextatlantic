import BodyDataParse from "@/app/components/elements/data-parse-content";
import BlogContainer from "@/app/components/layout/blog-container";
import PaddingContainer from "@/app/components/layout/padding-container";
import { geSinglePost } from "@/app/data/loader";
import { getImageUrl } from "@/libs/helper";
import Image from "next/image";






const SingleBlogPage = async ({ params }) => {


  const postData = await geSinglePost(params.slug);

 {/* console.log("-----------------------single post page--------------------------------------------------");
  console.dir(postData, { depth: null });
  console.log("---------------------------End-----single post------------------end-----------------------");
*/}

  return (



    <div>
      <PaddingContainer>

        {/*  Post Area   */}
        <div className=" w-full  flex flex-col mt-20   p-10 pt-0 space-y-7   ">

          <div className="W-full h-auto bg-teal-400  " >
            <Image className="w-full h-auto " src={getImageUrl(postData.data[0].featureImage.url)} height={1200} width={1200} alt={postData.data[0].title} />
          </div>
          <h1 className="text-white text-2xl md:text-3xl" >{postData.data[0].title}</h1>
          <div className="text-white font-light text-base mt-5 max-w-xl  pr-5 md:pr-2 rich-text" >

            <BodyDataParse content={postData.data[0].description} />

          </div>

        </div>

      </PaddingContainer>

      <BlogContainer /> 
    </div>
  );
}

export default SingleBlogPage
