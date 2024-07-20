import Image from "next/image";

const ProductSize = ({packingSize}) => {


    const sizesArr = packingSize ? packingSize.split(',').map(item => parseInt(item, 10)).filter(Number.isFinite) : [];

    const getProductImage = (size)=>{
        switch(size)
        {
            case 0.7:
                return   "drum-icon.jpg"
            case 1:
                 return "drum-icon.jpg"
            case 2:
                return  "drum-icon.jpg"
            case 3:
                 return  "drum-icon.jpg"
            case 4:
                 return  "drum-icon.jpg"
            case 5:
                 return  "drum-icon.jpg" 
            case 20:
                 return  "drum-icon.jpg"
            case 200:
                 return  "drum-icon.jpg" 
            case 208:
                 return  "drum-icon.jpg"
           
        }

       
    };



    return (
        <div>
          {sizesArr && sizesArr.length > 0 && (
            <div className="  flex flex-col w-full  h-auto ">
                <div className="text-center uppercase mt-10 text-gray-300">Size Available</div>
                <div className="flex justify-center items-center   mt-5 space-x-1">

                {sizesArr.map((size,index) => ( 
                    
                    <div key={index} className="flex flex-col justify-center items-center">
                        <div className="w-12 md:w-8 lg:w-8 h-auto" ><Image src={`/images/${getProductImage(size)}`} width={150} height={150} alt={`product packing size ${size}`} /></div>
                        <div className="text-center uppercase text-gray-300">{size}L</div>
                    </div>

                   ))}
                    
                    

                </div>

            </div>
            )}
        </div>
    )
}

export default ProductSize
