import React from 'react'
import { geAllPostSlug, gePosts, getBlogPage } from '../data/loader';
import TopBanner from '../components/layout/top-banner';
import { PaginationComponent } from "@/app/components/elements/pagination";
import PaddingContainer from '../components/layout/padding-container';
import Image from 'next/image';
import { getImageUrl } from '@/libs/helper';
import Link from 'next/link';
import { Suspense } from 'react'



export async function generateMetadata() {

    return {
      title: 'Blog dyn',
    }
  }

 
export const generateStaticParams = async () => {

    try {
      const postSlugs = await geAllPostSlug();
  
      const paramsSlugs = postSlugs?.data?.map((post) => {

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
 

const numbers = Array.from({ length: 12 }, (_, index) => index + 1);
const PageData = await getBlogPage();
const pageSize = 3;


const Blog = async ({ params }) => {
 


    const currentPage = Number(params.page) || 1;

    const postsData = await gePosts(currentPage,pageSize);

    const PostCount = postsData.meta.pagination.pageCount;
    const totalPosts = postsData.meta.pagination.total;


     console.log("-----------------------blog page--------------------------------------------------");
    //console.dir(postsData, { depth: null });
   // console.log("---------------------------End-------- Blog---------------end-----------------------");
    //  console.log(productData.data);
    // if(productData.data.length === 0)  return  <NotFound />

    //console.dir(productData.data.title, { depth:null});
    // console.log();

    return (
        <div>
            <TopBanner banner={PageData.banner} />

            <PaddingContainer>

                {/*  Post Area   */}
                <div className=" w-full  flex flex-col mt-8  lg:mt-48 px-16     ">
                    {/*   Content area content goes here  bg-[#2a3c46] */}
                  {/* <SearchBar /> */}  


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3   gap-7   ">

                        {postsData.data.map((post) => ( 

                            <div key={post.id} className="w-full flex flex-col text-white  md:text-left pb-14   ">
                                <Link href={`/blog/${post.slug}`}>   <Image className="w-full " src={getImageUrl(post?.featureImage.url)} width={800} height={600} alt={post.title} />
                                    <h2 className="text-darkYellow font-semibold  leading-6 text-lg md:text-base pt-3  text-justify">
                                        {post.title}
                                    </h2>
                                    <p className="text-lx md:text-sm text-justify">{post.seo?.seoDesctiption || ""}</p>
                                </Link>

                            </div>

                        ))}

                    </div>

                    <Suspense fallback={<div>Loading...</div>}>
                             <PaginationComponent pageCount={PostCount} totalPage={totalPosts} pageSize={pageSize} />
                     </Suspense>
                </div>

            </PaddingContainer>
        </div>
    )
}

 

export default Blog
