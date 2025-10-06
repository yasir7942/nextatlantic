const { getImageUrl } = require("@/libs/helper");
const { default: Image } = require("next/image");





const ImageTextBlock = ({ homeData }) => {
    const block = homeData?.imageText?.[0];
    const comp = block?.__component;

    if (!block || !comp) return null;

    if (comp === "layout.text-image") {
        // show heading, text, and image
        return (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3 md:pl-3">
                    {block?.title && (
                        <h2 className="text-2xl md:text-3xl font-semibold text-white">{block.title}</h2>
                    )}
                    {block?.description2 && (
                        <p className="text-gray-200 leading-relaxed">{block.description2}</p>
                    )}
                </div>

                {block?.image?.url && (
                    <div >
                        <Image
                            src={getImageUrl(block.image.url)}
                            className="w-auto h-[350px] md:h-[300px] lg:h-[400px]"
                            width={500}
                            height={500}
                            quality={100}
                            alt={block.image?.alternativeText ?? "Atlantic Product Range"}
                        />
                    </div>
                )}
            </section>
        );

    }

    if (comp === "layout.image") {
        //just show image
        if (!block?.image?.url) return null;
        return (
            <div className=" w-full flex items-center justify-center md:h-full">
                <Image
                    src={getImageUrl(block.image.url)}
                    className="w-auto h-[350px] md:h-[300px] lg:h-[400px]"
                    width={600}
                    height={500}
                    quality={100}
                    alt={block.image?.alternativeText ?? "Atlantic Product Range"}
                />
            </div>
        );

    }

    return null; // unknown component type
};


export default ImageTextBlock;

// Usage
// <ImageTextBlock homeData={homeData} />
