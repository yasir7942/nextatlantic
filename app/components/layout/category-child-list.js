import BodyDataParse from "../elements/data-parse-content";
import ProductCategoryBlock from "../elements/product-category-block";
import SEOSchema from "../elements/seo-schema";
import PaddingContainer from "./padding-container";
import SearchBar from "./search-bar";
import SingleTab from "./single-tab";
import TopBanner from "./top-banner";




const CategoryChildList = async ({ CategoryData }) => {

    const categoryData = await CategoryData;



    const categoryTitle = categoryData.data[0].categoryTitle;
    const categoryDescription = categoryData.data[0].categoryDescription;
    const readMore = categoryData.data[0].readMore;
    const faq = categoryData.data[0].faq ?? [];

    /*
        console.log("-----------------------category child list------------------------------------------");
        console.dir(categoryData.data[0].banner, { depth: null });
        console.log("---------------------------End--------p category----child-----------end-----------------------");
    */
    return (
        <div className="">
            <SEOSchema schemaList={categoryData.data[0]?.seo?.schema} />
            <TopBanner banner={categoryData.data[0].banner} />
            <PaddingContainer>

                <div className="topPadding 2xl:pt-[3%] 2xl:px-[10%]  lg:px-[5%]  ">
                    <SearchBar dataType="products" />


                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 justify-center items-center  gap-2  ">



                        {categoryData.data[0].child.data.map((category) => (

                            <ProductCategoryBlock key={category.id} colorImage={category.image.url} grayImage={category.bImage.url} url={category.slug} text={category.title} />
                        ))}
                    </div>

                </div>
                <div className="flex flex-col pt-10 w-full h-auto text-center my-20 2xl:px-[18%]">

                    {categoryTitle && <h1 className="text-lg text-darkYellow "> {categoryTitle} </h1>}
                    {categoryDescription && <div className="text-white  pb-10 rich-text">
                        <BodyDataParse content={categoryDescription} />
                    </div>}

                    {readMore && <SingleTab heading="Read More" text={readMore} faq={faq} />}



                </div>


            </PaddingContainer >




        </div >
    )
}

export default CategoryChildList
