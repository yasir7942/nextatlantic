 
import Image from "next/image"
import PaddingContainer from "./padding-container"
import SocialIcons from "../elements/social-icons"
import siteConfig from "../../../config/site";
import Link from "next/link";
import MobileNavigation from "./mobile-nav";

 

 



const Navigation = () => {


  



  return (


    <PaddingContainer >

      {/* <!--Nav Bar --> */}
      <nav className="flex w-full h-full justify-between items-center py-6 px-4 relative z-50   ">

        <a href="/" className="w-52">
          <Image
            src= "/images/logo-486x124.png"
            width={500}
            height={300}
            alt="Atlantic Grease and Lubricants" />
        </a>

        <ul className="hidden md:flex text-gray-200 md:space-x-3 lg:space-x-6  text-lg md:font-light  lg:font-normal capitalize tracking-wider ">
                      <li><Link href={`/`} > Home</Link></li>
                      <li><Link href={`/about-us`} > About Us</Link></li>
                      <li> <Link href={`/products`} > Product </Link></li>
                      <li><Link href={`/blog`}  > Blog </Link></li>
                      <li><Link href={`/contact`}   >Contact Us</Link></li>
        </ul>

        <ul className="hidden md:flex text-white  md:space-x-2 lg:space-x-5">
          <li><SocialIcons plateform="facebook" link={siteConfig.socialMedia.facebook} /></li>
          <li><SocialIcons plateform="instagram" link={siteConfig.socialMedia.instagram} /></li>
          <li><SocialIcons plateform="twitter" link={siteConfig.socialMedia.twitter} /></li>
          <li><SocialIcons plateform="youtube" link={siteConfig.socialMedia.youtube} /></li>
        </ul>

        <div className="md:hidden text-white text-4xl">
                   
          <MobileNavigation />
        </div>
      </nav>
      {/* <!--End Nav Bar--> */}

    </PaddingContainer>

  )
}

export default Navigation
