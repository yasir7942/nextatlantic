import BodyDataParse from "@/app/components/elements/data-parse-content";
import SEOSchema from "@/app/components/elements/seo-schema";
import BlogContainer from "@/app/components/layout/blog-container";
import PaddingContainer from "@/app/components/layout/padding-container";
import { geSinglePost } from "@/app/data/loader";
import { getFirstDescriptionText, getImageUrl, validateCanonicalSlug } from "@/libs/helper";
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import Image from "next/image";
import { cache } from 'react';
 


// Cache the geSinglePost function
const cachedGeSinglePost = cache(geSinglePost);

export async function generateMetadata({ params }) {
  const postData = await cachedGeSinglePost(params.slug);

  const metadataParams = {
    pageTitle: postData.data[0].title,
    pageSlug: postData.data[0].slug,
    pageDescription: getFirstDescriptionText(postData.data[0].description),
    seoTitle: postData.data[0].seo?.seoTitle,
    seoDescription: postData.data[0].seo?.seoDescription,
    rebotStatus: postData.data[0].seo?.preventIndexing,
    canonicalLinks: postData.data[0].seo?.canonicalLinks,
    dataPublishedTime: postData.data[0].publishedAt,
    category: postData.data[0].post_categories?.data[0].title,
    image: postData.data[0].featureImage.url,
    imageAlternativeText:  postData.data[0].featureImage?.alternativeText,
    imageExt:  postData.data[0].featureImage?.mime,
  };

  return await generatePageMetadata({ type: "post", path: "/post/", params: metadataParams });
}





const SingleBlogPage = async ({ params }) => {


  const postData = await cachedGeSinglePost(params.slug);
  //const postData = await geSinglePost(params.slug);

 {/* console.log("-----------------------single post page--------------------------------------------------");
  console.dir(postData, { depth: null });
  console.log("---------------------------End-----single post------------------end-----------------------");
*/}
const firstDescriptionText = getFirstDescriptionText(postData.data[0].description);
const seoDescription = postData.data[0].seo?.seoDescription?.trim() ? postData.data[0].seo.seoDescription.trim() : firstDescriptionText;

const jsonLd =
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": postData.data[0].title,
  "description": seoDescription,
  "image": [
    getImageUrl(postData.data[0].featureImage?.formats.thumbnail.url),
    getImageUrl(postData.data[0].featureImage?.url)
   ],
  "datePublished": postData.data[0].publishedAt,
  "dateModified": postData.data[0].updatedAt,
  "author": [{
      "@type": "Organization",
      "name": "Jawad Haroon",
    }]
};



  return (



    <div>

      {/*  JSON-LD of Page */}
      <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

           <SEOSchema schemaList={postData.data[0].seo?.schema}  />

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
