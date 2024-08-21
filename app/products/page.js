import Image from "next/image"
import PaddingContainer from "../components/layout/padding-container"
import TopBanner from "../components/layout/top-banner"
import ProductCategoryBlock from "../components/elements/product-category-block"
import { geGridCategoybyProduct, geProductCategoryLeftMenu } from "../data/loader"
import { cache } from 'react';
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import SEOSchema from "../components/elements/seo-schema"
 

const cachedGetGrideCategoryPage = cache(geGridCategoybyProduct);
export async function generateMetadata({ params }) {
 
 
  const pageData = await cachedGetGrideCategoryPage(); 
    
  const metadataParams = {
    pageTitle:   pageData.slug,
    pageSlug: "product",
    pageDescription: "",
    seoTitle: pageData.seo?.seoTitle,
    seoDescription: pageData.seo?.seoDescription,
    rebotStatus: pageData.seo?.preventIndexing,
    canonicalLinks: pageData.seo?.canonicalLinks?? "product",
    dataPublishedTime: pageData.publishedAt,
    category: "",
    image: process.env.NEXT_PUBLIC_ADMIN_BASE_URL + pageData.banner?.mobileBanner?.url,
    imageAlternativeText:  pageData.banner?.mobileBanner?.alternativeText ?? pageData.title,
    imageExt:  pageData.banner?.mobileBanner?.mime,
  };

  return await generatePageMetadata({ type: "page", path: "", params: metadataParams });
}



const Products = async () => {

  const pageData = await cachedGetGrideCategoryPage();
  const categoryData = await geProductCategoryLeftMenu();
  
    // console.log("-----------------------product category  Grid--------------------------------------------------");
  //  console.dir(categoryData, { depth:null});
  //console.log("---------------------------End-----------------------end-----------------------");


  return (
    <div>

    <SEOSchema schemaList={pageData.seo?.schema}  />

        <TopBanner banner={pageData.banner} />
     
   {/* product category container */}
    <section>


    

      <PaddingContainer>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  gap-4 md:gap-5 md:mx-10 xl:gap-x-0 xl:mx-38   ">

            {categoryData.data.map((category) => (
               
                <ProductCategoryBlock  key={category.id}  colorImage={category.image.url} grayImage={category.bImage.url} url={category.slug} text={category.title} />
            ))}

          </div>



 
 
      </PaddingContainer>

          <div className="relative  w-full h-[855px] justify-center items-center ">
              <Image className="absolute inset-0 w-full h-full object-cover" src="/images/product-banner2.png" width={1600} height={800} alt="" />
                <a href="https://www.youtube.com/@AtlanticGreaseLubricant" target="_blank" className="absolute w-16 h-16  inset-0 left-32 md:left-40 top-[160px] md:top-[480px] z-50">
              <Image className="w-16 h-16  " src="/images/white-play-button.png" width={1600} height={500} alt="" />
            </a>
          </div>

    
    </section>
    </div>
  )
}

export default Products
