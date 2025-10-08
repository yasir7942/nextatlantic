import BodyDataParse from "@/app/components/elements/data-parse-content";
import SEOSchema from "@/app/components/elements/seo-schema";
import BlogContainer from "@/app/components/layout/blog-container";
import PaddingContainer from "@/app/components/layout/padding-container";
import { geSinglePost, getAllPostSlugs } from "@/app/data/loader";
import siteConfig from "@/config/site";
import { getFirstDescriptionText, getImageUrl, validateCanonicalSlug } from "@/libs/helper";
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from 'react';



// Cache the geSinglePost function
const cachedGeSinglePost = cache(geSinglePost);

export async function generateMetadata(props) {
  const params = await props.params;
  const postData = await cachedGeSinglePost(params.slug);



  if (!postData || !postData.data[0]) {
    notFound();
  }


  const metadataParams = {
    pageTitle: postData.data[0].title,
    pageSlug: postData.data[0].slug,
    pageDescription: getFirstDescriptionText(postData.data[0].description),
    seoTitle: postData.data[0].seo?.seoTitle,
    seoDesctiption: postData.data[0]?.seo?.seoDesctiption ?? "",
    rebotStatus: postData.data[0].seo?.preventIndexing,
    canonicalLinks: postData.data[0].seo?.canonicalLinks,
    dataPublishedTime: postData.data[0].publishedAt,
    category: postData.data[0].post_categories?.data[0].title,
    image: process.env.NEXT_PUBLIC_ADMIN_BASE_URL + postData.data[0].featureImage.url,
    imageAlternativeText: postData.data[0].featureImage?.alternativeText,
    imageExt: postData.data[0].featureImage?.mime,
  };




  return await generatePageMetadata({ type: "post", path: "/blog/", params: metadataParams });
}



export const generateStaticParams = async () => {

  try {
    const postSlugs = await getAllPostSlugs();
    const paramsSlugs = postSlugs?.map((post) => {
      // console.log("*******Post slug: "+ post.slug);
      return {
        slug: post.slug
      };
    })

    return paramsSlugs || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error Fetching generateStaticParams");
  }
}



const SingleBlogPage = async props => {
  const params = await props.params;

  const postData = await cachedGeSinglePost(params.slug);

  if (!postData || !postData.data[0]) {
    notFound();
  }



  // console.log("-----------------------single post page--------------------------------------------------");
  //  console.dir(postData, { depth: null });
  //  console.log("---------------------------End-----single post------------------end-----------------------");
  // console.log(postData.data[0].featureImage);
  const firstDescriptionText = getFirstDescriptionText(postData.data[0].description);
  const seoDesctiption = postData.data[0]?.seo?.seoDesctiption?.trim() ? postData.data[0]?.seo?.seoDesctiption?.trim() : firstDescriptionText;

  const jsonLd =
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postData.data[0].title,
    "description": seoDesctiption,
    "image": [
      getImageUrl(postData.data[0].featureImage?.formats?.thumbnail?.url),
      getImageUrl(postData.data[0].featureImage?.url)
    ],
    "datePublished": postData.data[0].publishedAt,
    "dateModified": postData.data[0].updatedAt,
    "author": [{
      "@type": "Organization",
      "name": siteConfig.postAuthor,
    }]
  };



  return (

    <div>

      {/*  JSON-LD of Page */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SEOSchema schemaList={postData.data[0].seo?.schema} />

      <PaddingContainer>

        {/*  Post Area   */}
        <div className=" w-full  flex flex-col mt-20 p-0  md:p-10 pt-0 space-y-7 ">

          <div className="W-full h-auto  z-1 " >
            {postData.data[0].featureImage && <Image className="w-full h-auto " quality={100} src={getImageUrl(postData.data[0].featureImage.url)} height={1200} width={1200} alt={postData.data[0].title} />}
          </div>
          <h1 className="text-white text-2xl md:text-3xl" >{postData.data[0].title}</h1>
          <div className="text-white font-light text-base mt-5   pr-5 md:pr-2 rich-text blog-rich-text " >

            <BodyDataParse content={postData.data[0].description} />

          </div>

        </div>

      </PaddingContainer>

      <BlogContainer />
    </div>
  );
}

export default SingleBlogPage
