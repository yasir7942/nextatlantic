

import Image from "next/image"

import SocialIcons from "../elements/social-icons"
import siteConfig from "../../../config/site";


import Link from "next/link";
import MainMenuWrapper from "./main-menu-warpper";
import MobileNavigation2 from "./mobile-nav2";

import PaddingContainerTop from "./padding-container-top";
import { cachedGetProductCategoryLeftMenu } from "@/app/data/cacheLoader";



const Navigation = async () => {


  const productCategoryData = await cachedGetProductCategoryLeftMenu();




  return (


    <PaddingContainerTop >

      {/* <!--Nav Bar --> */}
      <nav className="flex w-full h-full justify-between items-center py-6 px-4 relative z-50  ">

        <Link href="/" className="w-52 2xl:w-64">
          <Image
            src="/images/logo-486x124.png"
            width={500}
            height={200}
            alt="Atlantic Grease and Lubricants logo" />
        </Link>


        <MainMenuWrapper productCategory={productCategoryData} />

        <ul className="hidden md:flex text-white  md:space-x-2 lg:space-x-5">
          <li><SocialIcons plateform="facebook" link={siteConfig.socialMedia.facebook} /></li>
          <li><SocialIcons plateform="instagram" link={siteConfig.socialMedia.instagram} /></li>
          <li><SocialIcons plateform="twitter" link={siteConfig.socialMedia.twitter} /></li>
          <li><SocialIcons plateform="youtube" link={siteConfig.socialMedia.youtube} /></li>
        </ul>

        <div className="md:hidden text-white text-4xl">

          <MobileNavigation2 productCategory={productCategoryData} />



        </div>
      </nav>
      {/* <!--End Nav Bar--> */}

    </PaddingContainerTop>

  )
}

export default Navigation
