const { getImageUrl } = require("@/libs/helper");
const { default: Image } = require("next/image");





const ImageTextBlock = ({ homeData }) => {
    const block = homeData?.imageText?.[0];
    const comp = block?.__component;

    if (!block || !comp) return null;

    if (comp === "layout.text-image") {
        // show heading, text, and image
        return (
            <section className="w-full">
                {/* Heading stays full-width; never wraps around the image */}
                {block?.title && (
                    <h2 className="text-2xl md:text-3xl font-semibold text-white md:mb-4">
                        {block.title}
                    </h2>
                )}

                {/* Text + floated image wrapper */}
                <div className="space-y-3 md:pl-3">
                    {/* Desktop: floated image (does NOT affect the heading above) */}
                    {block?.image?.url && (
                        <div
                            className="
          hidden md:block float-right ml-6 mb-3
          w-[320px] h-[320px]
          [shape-outside:ellipse(55%_45%_at_55%_50%)]
          [shape-margin:12px]
        "
                        >
                            <Image
                                src={getImageUrl(block.image.url)}
                                alt={block.image?.alternativeText ?? "Atlantic Product"}
                                width={500}
                                height={500}
                                quality={100}
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                    )}

                    {/* Paragraph(s) will wrap nicely around the image */}
                    {block?.description2 && (
                        <p className="text-gray-200 leading-relaxed">{block.description2}</p>
                    )}

                    {/* Mobile: stacked image below text */}
                    {block?.image?.url && (
                        <div className="md:hidden mt-6">
                            <Image
                                src={getImageUrl(block.image.url)}
                                alt={block.image?.alternativeText ?? "Atlantic Product"}
                                width={450}
                                height={450}
                                quality={100}
                                className="w-auto h-[340px]"
                            />
                        </div>
                    )}

                    {/* Ensure anything after this block doesn’t wrap around the float */}
                    <div className="clear-both" />
                </div>
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
