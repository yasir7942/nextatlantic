import Image from "next/image";
import PaddingContainer from "./padding-container";
import siteConfig from "@/config/site";
import SocialIcons from "../elements/social-icons";
import Link from "next/link";
import { cachedGetContactUsPage, cachedGetProductCategoryFeature } from "@/app/data/cacheLoader";



const Footer = async () => {



  const categoryData = await cachedGetProductCategoryFeature();
  const contactData = await cachedGetContactUsPage();



  return (

    <footer className="w-full mt-10 pt-5 z-30 relative pb-8 bg-[#040404]   ">
      <PaddingContainer>
        <div className="w-full flex flex-col md:flex-row mt-10 pl-0 md:pl-0 space-y-10 md:space-y-0 justify-between  ">


          {/* About Company */}
          <div className="flex flex-col space-y-3  ">
            <div className="uppercase text-white font-medium py-4 text-xl">About Company</div>
            <Link href="/" className="w-64">
              <Image
                src="/images/logo-486x124.png"
                width={500}
                height={300}
                alt="Atlantic Grease and Lubricants Logo"
              />
            </Link>
            <p className="text-base text-gray-300 font-light max-w-sm md:max-w-60 lg:max-w-80">
              {contactData?.footerAboutUs}
            </p>
            <div className="flex flex-wrap space-x-2 line pr-3">


            </div>
            {<ul className="flex flex-wrap  md:w-60  lg:w-72  gap-2 line pr-3">

              <li><SocialIcons plateform="facebook" dark link={siteConfig.socialMedia.facebook} /></li>
              <li><SocialIcons plateform="instagram" dark link={siteConfig.socialMedia.instagram} /></li>
              <li><SocialIcons plateform="twitter" dark link={siteConfig.socialMedia.twitter} /></li>
              <li><SocialIcons plateform="youtube" dark link={siteConfig.socialMedia.youtube} /></li>

              <li><SocialIcons plateform="vimeo" dark link={siteConfig.socialMedia.vimeo} /></li>
              <li><SocialIcons plateform="tiktok" dark link={siteConfig.socialMedia.tiktok} /></li>
              <li><SocialIcons plateform="pinterest" dark link={siteConfig.socialMedia.pinterest} /></li>
              <li><SocialIcons plateform="snapchat" dark link={siteConfig.socialMedia.snapchat} /></li>

            </ul>
            }

          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">

            <div className="uppercase text-white font-medium py-4 text-xl">Quick Links</div>
            {/* <MenuFooterList /> */}

            <ul className="text-gray-300 space-y-1  font-light">
              <li> <Link href={`/certificates`} > Certifications & Approvals </Link>  </li>
              <li>  <Link href={`/privacy-policy`} > Privacy Policy </Link>   </li>
              <li> <Link href={`/interested-parties`} > Interested Parties </Link>   </li>
              <li>    <Link href={`/ims-policy`} > IMS Policy </Link>  </li>
              <li>   <Link href={`/hse`} > HSE</Link>   </li>
            </ul>

          </div>

          {/* Categories */}
          <div className="flex flex-col space-y-3">
            <div className="uppercase text-white font-medium py-4 text-xl">Product Categories</div>
            {/*  <MenuFooterPcategory /> */}

            <ul className="text-gray-300  space-y-1 font-light">

              {categoryData.data.map(cat => (

                <li key={cat.id}>
                  <Link href={`/product-category/${cat.slug}`}   >{cat.title}</Link>
                </li>
              ))}


            </ul>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col space-y-3">
            <div className="uppercase text-white font-medium py-4 text-xl">Get in Touch</div>
            <p className="text-base text-gray-300 font-light max-w-60">{contactData?.fzcPhone}</p>
            <p className="text-base text-gray-300 font-light max-w-60">
              Email: <Link href="mailto:info@atlanticlubes.com">{contactData?.email}</Link>
            </p>
            <div className="uppercase text-white font-medium py-4 text-xl">Head Office</div>
            <p className="text-base text-gray-300 font-light max-w-60">
              <Link href={contactData?.mapUrl} target="_blank" rel="noopener noreferrer">
                {contactData?.fzcAddress}
              </Link>
            </p>
            <p className="text-base text-gray-300 font-light max-w-60">
              <Link href={contactData?.mapUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </Link>
            </p>
          </div>



        </div>
      </PaddingContainer>
    </footer >

  );
}

export default Footer;
