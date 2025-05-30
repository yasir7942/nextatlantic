import BodyDataParse from "@/app/components/elements/data-parse-content";
import GroupProducts from "@/app/components/layout/group-products";
import PaddingContainer from "@/app/components/layout/padding-container";
import ProductCategoryMenu from "@/app/components/layout/product-category-menu";
import TopBanner from "@/app/components/layout/top-banner";
import { geAllProductsSlug, geSingleProduct } from "@/app/data/loader";
import { getFirstDescriptionText, getImageUrl } from "@/libs/helper";
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { cache } from 'react';
import siteConfig from "@/config/site";
import SEOSchema from "@/app/components/elements/seo-schema";
import ProductSize from "@/app/components/layout/product-size";
import { notFound } from "next/navigation";

// Cache the geSingleProduct function
const cachedGeSingleProduct = cache(geSingleProduct);


export const generateStaticParams = async () => {
  try {
    const productSlugs = await geAllProductsSlug();

    const paramsSlugs = productSlugs?.map((product) => {
      return {
        slug: product.slug
      };
    });

    return paramsSlugs || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error Fetching generateStaticParams");
  }
}





export async function generateMetadata(props) {
  const params = await props.params;
  const productData = await geSingleProduct(params.slug);

  if (!productData || !productData?.data[0]) {
    notFound();
  }

  const metadataParams = {
    pageTitle: productData?.data[0]?.title,
    pageSlug: productData?.data[0]?.slug,
    pageDescription: getFirstDescriptionText(productData?.data[0].description),
    seoTitle: productData?.data[0].seo?.seoTitle,
    seoDescription: productData?.data[0].seo?.seoDescription,
    rebotStatus: productData?.data[0].seo?.preventIndexing,
    canonicalLinks: productData?.data[0].seo?.canonicalLinks,
    dataPublishedTime: productData?.data[0].publishedAt,
    category: productData?.data[0].product_categories?.data[0]?.title || "",
    image: process.env.NEXT_PUBLIC_ADMIN_BASE_URL + productData?.data[0].productImage.url,
    imageAlternativeText: productData?.data[0].productImage?.alternativeText,
    imageExt: productData?.data[0].productImage?.mime,
  };

  return await generatePageMetadata({ type: "product", path: "/product/", params: metadataParams });
}




const SingleProductPage = async props => {
  const params = await props.params;
  const productData = await cachedGeSingleProduct(params.slug);
  let selectedCategoryParent = "";

  /*
    console.log("-----------------single product data --------------");
    console.dir(productData.data[0].product_categories, { depth: null });
    console.log("Product Categories---:", productData.data[0]?.product_categories.data[0].parent?.slug);
    console.log("-----------------End------------");
  */


  if (productData.data[0]?.product_categories?.data?.length > 0) {

    const selectedCategory = productData.data[0]?.product_categories.data[0];
    if (!selectedCategory?.parent || Object.keys(selectedCategory?.parent).length === 0) {
      selectedCategoryParent = selectedCategory.slug;
    } else {
      selectedCategoryParent = selectedCategory?.parent.slug;
    }
  }





  if (!productData || !productData?.data[0]) {
    notFound();
  }



  const content = productData?.data[0].description;
  const productGroup = productData?.data[0].related_products;
  const firstDescriptionText = getFirstDescriptionText(productData?.data[0].description);
  const seoDescription = productData?.data[0].seo?.seoDescription ? productData?.data[0].seo?.seoDescription : firstDescriptionText;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const category = productData?.data[0].product_categories?.data[0]?.title ? productData?.data[0].product_categories?.data[0]?.title : "product Category";
  const categorySlug = productData?.data[0].product_categories?.data[0]?.slug ? productData?.data[0].product_categories?.data[0]?.slug : "#";

  let ratingCounter = 0;

  const reviews = productData?.data[0]?.productSchema?.reviews?.map(review => {
    ratingCounter += review.bestRating;
    return {
      "@type": "Review",
      "name": review?.title,
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.bestRating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "datePublished": review.datePublished,
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "AtlanticLubes"
      }
    };
  });

  const averageRating = (ratingCounter / productData?.data[0].productSchema?.reviews?.length || 0) || 4.8;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productData?.data[0]?.title,
    "image": getImageUrl(productData?.data[0].productImage.url),
    "image": [
      getImageUrl(productData?.data[0].productImage.url),  // large
      getImageUrl(productData?.data[0].productImage.formats.thumbnail.url),  // medium
    ],
    "description": seoDescription,
    "brand": {
      "@type": "Brand",
      "name": "Atlantic Lubricants and Greases"
    },
    "sku": productData?.data[0].productSchema?.sku,
    "gtin8": productData?.data[0].productSchema?.gtin8,
    "mpn": productData?.data[0].productSchema?.mpn,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,   // average rating value
      "reviewCount": productData?.data[0].productSchema?.reviews?.length || 1,   // total reviews  set 1 if null, undefine or 0 
      "bestRating": "5",
      "worstRating": "2",
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": "25",
      "lowPrice": "1",
      "highPrice": "500",
      "priceValidUntil": "10-10-2040",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "http://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Atlantic Grease and Lubricant"
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "AE",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 15,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    },
    "review": reviews,
  };

  // BreadcrumbList
  const jsonLd2 = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl,
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": category,
      "item": baseUrl + '/' + categorySlug
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": productData?.data[0]?.title,
    }]
  };

  // image schema for seo
  const jsonLd3 = {
    "@context": "https://schema.org/",
    "@type": "ImageObject",
    "contentUrl": getImageUrl(productData?.data[0].productImage.url),
    "license": siteConfig.imageObject.license,
    "acquireLicensePage": siteConfig.imageObject.acquireLicensePage,
    "creditText": siteConfig.imageObject.creditText,
    "creator": {
      "@type": "Organization",
      "name": siteConfig.imageObject.creatorName,
    },
    "copyrightNotice": siteConfig.imageObject.copyrightNoticeProduct
  };


  return (
    <div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd2) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd3) }} />

      <SEOSchema schemaList={productData?.data[0].seo?.schema} />

      <TopBanner banner={productData?.data[0]?.product_categories.data[0]?.banner} />

      <PaddingContainer>
        <div className="w-full h-auto flex flex-col md:flex-row topPadding">
          {/* Left Menu Column */}
          <div className="w-full md:w-3/12 lg:w-1/6 p-6 md:pl-0 overflow-hidden">
            {/* Menu content goes here  */}
            <ProductCategoryMenu Parent={selectedCategoryParent} />
          </div>

          {/* Content Area */}
          <div className="w-full md:w-9/12 justify-between lg:w-5/6 flex flex-col  bg-[#2a3c4659] p-3 md:p-4 pb-3 ">
            {/* Content area content goes here */}
            <div className="flex flex-col md:flex-row w-full h-auto p-0 lg:p-8 ">
              {/* text section */}
              <div className="w-full md:w-4/6 flex flex-col text-white  ">
                <div className="uppercase font-semibold text-4xl tracking-widest">
                  {productData?.data[0].name}
                </div>
                <div className="uppercase font-light text-2xl text-gray-300 tracking-widest">
                  {(productData?.data[0].grade ? productData?.data[0].grade : "") + (productData?.data[0].api ? productData?.data[0].api : "") + (productData?.data[0].acea ? " " + productData?.data[0].acea : "")}
                </div>
                <div className="text-white font-light text-base mt-5 max-w-xl pr-5 md:pr-2 2xl:max-w-5xl rich-text  ">
                  <BodyDataParse content={content} />
                </div>



                <div>
                  {/* Check if either MSDSFile or TDSFile exists */}
                  {(productData?.data[0].MSDSFile?.url || productData?.data[0].TDSFile?.url) && (
                    <div className="mt-10 text-gray-300 text-lg">Download</div>
                  )}

                  <div className="w-full flex flex-col md:flex-row mt-5 pr-0 md:pr-5 lg:pr-16 gap-2 md:gap-0">
                    {/* MSDS File */}
                    {productData?.data[0].MSDSFile?.url && (
                      <a
                        href={`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}${productData?.data[0].MSDSFile.url}`}
                        target="_blank"
                        rel="nofollow"
                        className="w-full md:w-1/2 h-full"
                        download
                      >
                        <div className="h-full w-full bg-gray-400 text-black flex justify-center items-center space-x-2 font-light text-center p-4">
                          <div>Material Safety Data Sheet</div>
                          <FaDownload />
                        </div>
                      </a>
                    )}

                    {/* TDS File */}
                    {productData?.data[0].TDSFile?.url && (
                      <a
                        href={`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}${productData?.data[0].TDSFile.url}`}
                        target="_blank"
                        rel="nofollow"
                        className="w-full md:w-1/2 h-full"
                        download
                      >
                        <div className="h-full w-full bg-white text-black flex justify-center items-center space-x-2 font-light text-center p-4">
                          <div>Technical Data Sheet</div>
                          <FaDownload />
                        </div>
                      </a>
                    )}
                  </div>
                </div>



              </div>
              {/* image section */}
              <div className="w-full md:w-2/6 items-center">
                <div className="w-full flex flex-col justify-center pt-20 md:pt-13 lg:pt-10 items-center text-center">
                  <Image
                    priority
                    className="relative w-44 md:w-36 lg:w-52 text-center"
                    src={getImageUrl(productData?.data[0].productImage.url)}
                    height={1000}
                    width={1000}
                    alt={productData?.data[0]?.title}
                  />
                  <ProductSize packingSize={productData?.data[0].packing} />
                </div>
              </div>
            </div>
            {/* Related Product section */}
            <div className="w-full flex flex-col justify-center items-center text-gray-300 mt-5">
              <GroupProducts productGroup={productGroup} />
            </div>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default SingleProductPage;
