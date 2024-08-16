import Image from "next/image";

const ProductSize = ({ packingSize }) => {
  const sizesArr = packingSize
    ? packingSize.split(',').map(item => parseFloat(item)).filter(Number.isFinite)
    : [];

  const getProductImage = (size) => {
    switch (size) {
      case 0.7:
      case 1: 
      case 2:
      case 3:
      case 4:
      case 5:
      case 20:
      case 25:
      case 200:
      case 208:
        return "drum-icon.jpg";
      default:
        return "default-icon.jpg"; // Add a default case for unexpected sizes
    }
  };

  return (
    <div>
      {sizesArr.length > 0 && (
        <div className="flex flex-col w-full h-auto">
          <div className="text-center uppercase mt-10 text-gray-300">Size Available</div>
          <div className="flex justify-center items-center mt-5 space-x-1">
            {sizesArr.map((size, index) => (
              <div key={index} className="flex flex-col justify-center items-center">
                <div className="w-12 md:w-8 lg:w-8 h-auto">
                  <Image 
                    src={`/images/${getProductImage(size)}`} 
                    width={150} 
                    height={150} 
                    alt={`product packing size ${size}`} 
                  />
                </div>
                <div className="text-center uppercase text-gray-300">{size}L</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSize;
