import Image from "next/image"
import PaddingContainer from "./padding-container"
import SocialIcons from "../elements/social-icons"
import siteConfig from "../../../config/site";
import { IoMdMenu } from "react-icons/io";


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"



const Navigation = () => {
  return (

     
    <PaddingContainer >
      
      {/* <!--Nav Bar --> */}
      <nav className="flex w-full h-full justify-between items-center py-6 px-4 relative z-50   ">
      
            <a href="/" className="w-52"> 
              <Image
                src="https://atlanticlubes.com/wp-content/uploads/2023/05/Atlanticlubes-logo.png.webp"
                width={500}
                height={300}
                alt="" />
            </a>
       
        <ul className="hidden md:flex text-gray-200 md:space-x-3 lg:space-x-6  text-lg md:font-light  lg:font-normal capitalize tracking-wider ">
            <li><a href="/">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="/products">Product</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact Us</a></li>
        </ul>
        
        <ul className="hidden md:flex text-white  md:space-x-2 lg:space-x-5">
            <li><SocialIcons plateform="facebook"  link={siteConfig.socialMedia.facebook} /></li>
            <li><SocialIcons plateform="instagram"  link={siteConfig.socialMedia.instagram} /></li>
            <li><SocialIcons plateform="twitter"  link={siteConfig.socialMedia.twitter} /></li>
            <li><SocialIcons plateform="youtube"  link={siteConfig.socialMedia.youtube} /></li>
        </ul>

        <div className="md:hidden text-white text-4xl">
           
            <Sheet>
              <SheetTrigger><a href="#"><IoMdMenu size={32}   /> </a></SheetTrigger>
              <SheetContent className="w-72">
                <SheetHeader>
                  
                  <SheetDescription >
                    
                      <div className="flex flex-col w-full h-full justify-between items-center py-6 px-4 relative     ">

                        <a href="/" className="w-[80%]"> 
                          <Image
                          src="https://atlanticlubes.com/wp-content/uploads/2023/05/Atlanticlubes-logo.png.webp"
                          width={500}
                          height={300}
                          alt="" />
                        </a>

                        <ul className="flex flex-col text-gray-200 mt-10 space-y-3 text-center  text-lg  font-light capitalize tracking-wider ">
                            <li><a href="/">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="/products">Product</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>

                        <ul className="flex text-white space-x-7 mt-10 ">
                            <li><SocialIcons plateform="facebook"  link={siteConfig.socialMedia.facebook} /></li>
                            <li><SocialIcons plateform="instagram"  link={siteConfig.socialMedia.instagram} /></li>
                            <li><SocialIcons plateform="twitter"  link={siteConfig.socialMedia.twitter} /></li>
                            <li><SocialIcons plateform="youtube"  link={siteConfig.socialMedia.youtube} /></li>
                        </ul>

                      </div>


                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

           
           
           
            
        </div>
      </nav>
      {/* <!--End Nav Bar--> */}

    </PaddingContainer>
     
  )
}

export default Navigation
