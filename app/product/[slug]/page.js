
import BodyDataParse from "@/app/components/elements/data-parse-content";
import GroupProducts from "@/app/components/layout/group-products";
import PaddingContainer from "@/app/components/layout/padding-container"
import ProductCategoryMenu from "@/app/components/layout/product-category-menu"
import TopBanner from "@/app/components/layout/top-banner"
import { geSingleProduct } from "@/app/data/loader";
import { getFirstDescriptionText, getImageUrl, validateCanonicalSlug } from "@/libs/helper";
import Image from "next/image"
import { FaDownload } from "react-icons/fa";
import { cache } from 'react';

// Cache the geSingleProduct function
const cachedGeSingleProduct = cache(geSingleProduct);


export async function generateMetadata({ params }) {
    // const productData = await geSingleProduct(params.slug);

    const productData = await cachedGeSingleProduct(params.slug);

    const firstDescriptionText = getFirstDescriptionText(productData.data[0].description);

    const seoTitle = productData.data[0].seo?.seoTitle?.trim() ? productData.data[0].seo.seoTitle : productData.data[0].title;
    const seoDescription = productData.data[0].seo?.seoDescription?.trim() ? productData.data[0].seo.seoDescription : firstDescriptionText;
    const rebotStatus = productData.data[0].seo?.preventIndexing ? "noindex" : "index";
    const dataPublishedTime = productData.data[0].publishedAt;
    const autoCanonicalSlug = "/product/" + params.slug + "/";
    const manualCanonicalSlug = validateCanonicalSlug(productData.data[0].seo?.canonicalLinks?.trim());
    const canonicalLink = process.env.NEXT_PUBLIC_BASE_URL + (productData.data[0].seo?.canonicalLinks?.trim() ? manualCanonicalSlug : autoCanonicalSlug);
    const category = productData.data[0].product_categories?.data[0].title ? productData.data[0].product_categories.data[0].title : "product";



    return {
        metadataBase: new URL('https://atlanticlubes.com'),
        title: seoTitle,
        description: seoDescription,
        category: category,
        robots: {
            index: rebotStatus,
            follow: rebotStatus,
            nocache: rebotStatus,
        },
        alternates: {
            canonical: canonicalLink,
            languages: {
                'en-US': canonicalLink,
                'en-UK': canonicalLink,
                'ar-AR': canonicalLink,
                'fr-FR': canonicalLink,
                'es-ES': canonicalLink,
            },
        },
        openGraph: {
            images: getImageUrl(productData.data[0].productImage.url),
            locale: 'en_US',
            url: process.env.NEXT_PUBLIC_BASE_URL + canonicalLink,
            type: 'website',
            publishedTime: dataPublishedTime,
        },
        other: {
            'og:type': 'product',
        },



    };
}




const SingleProductPage = async ({ params }) => {



    //const productData = await geSingleProduct(params.slug );

    const productData = await cachedGeSingleProduct(params.slug);


    /* console.log("-----------------------single product page--------------------------------------------------");
      console.dir(productData, { depth:null});
     console.log("---------------------------End-----single product------------------end-----------------------");
  */
    const content = productData.data[0].description;
    const productGroup = productData.data[0].related_products;
    const seoDescription = productData.data[0].seo?.seoDescription?.trim() ? productData.data[0].seo.seoDescription : firstDescriptionText;

    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productData.data[0].title,
        "image": getImageUrl(productData.data[0].productImage.url),
        "description": seoDescription,

        "brand": {
            "@type": "Thing",
            "name": "Atlantic"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "89"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "20.99",
            "priceValidUntil": productData.data[0].publishedAt,
            "itemCondition": "http://schema.org/NewCondition",
            "availability": "http://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Atlantic Grease and Lubricant"
            }
        }
    }






    return (
        <div>

            {/* Add JSON-LD to your page */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />


            <TopBanner banner={productData.data[0].product_categories.data[0].banner} />


            <PaddingContainer>


                <div className="w-full h-auto flex flex-col md:flex-row  ">
                    {/*  Left Menu Column  */}
                    <div className="w-full md:w-3/12 lg:w-1/6  p-6 md:pl-0  overflow-hidden">
                        {/* <!-- Menu content goes here   */}
                        <ProductCategoryMenu />
                    </div>

                    {/*  Content Area   */}
                    <div className=" w-full md:w-9/12 justify-between lg:w-5/6  flex flex-col bg-[#2a3c46] p-3 md:p-4 pb-3 ">
                        {/*   Content area content goes here  */}

                        <div className="flex flex-col md:flex-row w-full h-auto p-0 lg:p-8 ">
                            {/* text section */}
                            <div className="w-full md:w-4/6 flex flex-col text-white ">
                                <div className="uppercase font-semibold text-4xl tracking-widest ">{productData.data[0].name}</div>
                                <div className="uppercase font-light text-2xl text-gray-300 tracking-widest " >{(productData.data[0].grade ? productData.data[0].grade : "") + (productData.data[0].api ? productData.data[0].api : "") + (productData.data[0].acea ? " " + productData.data[0].acea : "")}</div>
                                <div className="text-white font-light text-base mt-5 max-w-xl  pr-5 md:pr-2 rich-text" >

                                    <BodyDataParse content={content} />

                                </div>

                                <div className="mt-10 text-gray-300 text-lg"> Download </div>
                                <div className="w-full h-auto flex  mt-5   pr-0 md:pr-5 lg:pr-16   " >
                                    <a href="#" className="w-1/2  "> <div className="  py-1  bg-gray-400 text-black flex justify-center items-center space-x-2 font-light text-center"><div>Techinical Data Sheet </div><FaDownload /></div></a>
                                    <a href="#" className="w-1/2  "> <div className="  py-1  bg-white text-black flex justify-center items-center space-x-2 font-light text-center"><div>Techinical Data Sheet </div><FaDownload /></div></a>

                                </div>
                            </div>
                            {/* image section */}
                            <div className="w-full md:w-2/6 items-center ">
                                <div className="  w-full flex flex-col justify-center pt-20 md:pt-13 lg:pt-10 items-center text-center ">
                                    <Image className="relative w-44 md:w-36 lg:w-52 text-center" src={getImageUrl(productData.data[0].productImage.url)} height={1000} width={1000} alt={productData.data[0].title} />
                                    <div className="relative w-full flex justify-center items-start -mt-[1px]   h-[80px] overflow-hidden">
                                        <Image className="relative w-44 md:w-36 lg:w-52 text-center object-top transform rotate-180 opacity-30" src={getImageUrl(productData.data[0].productImage.url)} height={1000} width={1000} alt={productData.data[0].title} />
                                    </div>

                                    <div className="  flex flex-col w-full  h-auto ">
                                        <div className="text-center uppercase mt-10 text-gray-300">Size Available</div>
                                        <div className="flex justify-center items-center   mt-5 space-x-1">
                                            <div className="flex flex-col justify-center items-center">
                                                <div className="w-12 md:w-8 lg:w-12 h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                                <div className="text-center uppercase text-gray-300">1L</div>
                                            </div>
                                            <div className="flex flex-col justify-center items-center">
                                                <div className="w-12 md:w-8 lg:w-12 h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                                <div className="text-center uppercase text-gray-300">4L</div>
                                            </div>

                                            <div className="flex flex-col justify-center items-center">
                                                <div className="w-12 md:w-8 lg:w-12 h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                                <div className="text-center uppercase text-gray-300">5L</div>
                                            </div>

                                            <div className="flex flex-col justify-center items-center">
                                                <div className="w-12 md:w-8 lg:w-12  h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                                <div className="text-center uppercase text-gray-300">20L</div>
                                            </div>

                                            <div className="flex flex-col justify-center items-center">
                                                <div className="w-12 md:w-8 lg:w-12 h-auto" ><Image src="/images/drum-icon.jpg" width={150} height={150} alt="" /></div>
                                                <div className="text-center uppercase text-gray-300">200L</div>
                                            </div>

                                        </div>

                                    </div>
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


    )
}

export default SingleProductPage
