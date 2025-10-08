


import { geAllProductCategorySlug, geProductsByCategory, getProductCategory } from "@/app/data/loader"


import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import { getFirstDescriptionText } from "@/libs/helper";


import { notFound } from "next/navigation";
import CategoryProductlist from "@/app/components/layout/category-product-list";
import CategoryChildList from "@/app/components/layout/category-child-list";
import { cache } from "react";

const cachedGetProductCategory = cache(getProductCategory);

export const generateStaticParams = async () => {
  try {
    const pcategorySlugs = await geAllProductCategorySlug();



    const paramsSlugs = pcategorySlugs?.map((category) => {
      return {
        pcategory: category.slug
      };
    });

    //console.log()("-------static params pcategory slugs----------------");
    //console.dir(paramsSlugs, { depth: null });
    // console.log("-------End static params pcategory slugs----------------");

    return paramsSlugs || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error Fetching generateStaticParams");
  }
}




export async function generateMetadata(props) {
  const params = await props.params;

  const categoryData = await cachedGetProductCategory(params.pcategory);

  // console.log("-----,", categoryData.data[0].title)
  if (!categoryData || !categoryData.data[0]) {
    NotFound();
  }

  const metadataParams = {
    pageTitle: categoryData.data[0].title,
    pageSlug: categoryData.data[0].slug,
    pageDescription: getFirstDescriptionText(categoryData.data[0].description),   // 0
    seoTitle: categoryData.data[0].seo?.seoTitle,
    seoDescription: categoryData.data[0].seo?.seoDescription || "",
    rebotStatus: categoryData.data[0].seo?.preventIndexing,
    canonicalLinks: categoryData.data[0].seo?.canonicalLinks,  // null
    dataPublishedTime: categoryData.data[0].publishedAt,
    category: "",
    image: process.env.NEXT_PUBLIC_ADMIN_BASE_URL + categoryData.data[0].banner?.mobileBanner?.url,
    imageAlternativeText: categoryData.data[0].banner?.mobileBanner?.alternativeText,   // null
    imageExt: categoryData.data[0].banner?.mobileBanner?.mime,
  };



  return await generatePageMetadata({ type: "category", path: "/product-category/", params: metadataParams });
}





const pageSize = 12;


const ProductCategory = async props => {

  const searchParams = await props.searchParams;
  const params = await props.params;
  let selectedCategoryParent = "";
  let isParent = false;

  const currentPage = Number(searchParams.page) || 1;

  // product show by category

  const productData = await geProductsByCategory(params.pcategory, currentPage, pageSize);

  const categoryData = await cachedGetProductCategory(params.pcategory);  // use cache

  //console.log("-----,", categoryData.data[0])

  if (!categoryData || !categoryData.data[0]) {
    notFound();
  }


  const selectedCategory = categoryData.data[0];


  //console.log("-----,", selectedCategory)

  if (!selectedCategory.parent || Object.keys(selectedCategory.parent).length === 0) {
    selectedCategoryParent = selectedCategory.slug;
    isParent = true;

  } else {

    selectedCategoryParent = selectedCategory.parent.slug;
  }








  //console.log("-----------------------products --------category page------------------------------------------");
  // console.dir(category, { depth: null });
  //console.log("---------------------------End--------p category---------------end-----------------------");
  //  console.log(productData.data);
  // if(productData.data.length === 0)  return  <NotFound />

  //console.dir(productData.data.title, { depth:null});
  // console.log();

  return (
    < >

      {isParent ? (

        <CategoryChildList CategoryData={categoryData} />

      ) : (
        <CategoryProductlist selectedCategoryParent={selectedCategoryParent} productData={productData} PageSize={pageSize} />
      )}




    </>


  )
}

export default ProductCategory
