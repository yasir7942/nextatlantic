import { getImageUrl } from "@/libs/helper";
import Image from "next/image";

const GroupProducts = ({ productGroup }) => {
  return (
    <>
      {productGroup && productGroup.data && productGroup.data.length > 0 && (
        <div className="uppercase tracking-wider text-xl">
          Check Out Other Products In This Range
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-12 md:gap-8 lg:gap-20 justify-center items-center mt-10">
        {productGroup.data.map((product) => (
          <div key={product.id} className="grid flex-col w-full justify-center items-center space-y-0">
            <a href={`/product/${product.slug}`}>
              <Image
                className="w-36"
                src={getImageUrl(product.productImage.url)}
                height={600}
                width={600}
                alt={product.title}
              />
            </a>
            <h2 className="uppercase text-lg text-burnYellow pt-3 leading-1">
              <a href={`/product/${product.slug}`}>{product.name}</a>
            </h2>
            <p className="text-gray-200 text-base xl:text-xl font-light text-center leading-5 uppercase">
              {product.grade}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupProducts;
