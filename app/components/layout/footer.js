import Image from "next/image";
import PaddingContainer from "./padding-container";
//import siteConfig from "@/config/site";
//import SocialIcons from "../elements/social-icons";
//import MenuFooterList from "./menu-footer-list";
//import MenuFooterPcategory from "./menu-footer-product-category";

const Footer = () => {
  return (
    
      <footer className="w-full mt-10 pt-5 pb-8 bg-[#040404]">
        <PaddingContainer>
          <div className="w-full flex flex-col md:flex-row mt-10 pl-12 md:pl-0 space-y-10 md:space-y-0 justify-between">
            {/* About Company */}
            <div className="flex flex-col space-y-3">
              <div className="uppercase text-white font-medium py-4 text-xl">About Company</div>
              <a href="/" className="w-64">
                <Image
                  src="/images/logo-486x124.png"
                  width={500}
                  height={300}
                  alt="Atlantic Grease and Lubricants Logo"
                />
              </a>
              <p className="text-base text-gray-300 font-light max-w-sm md:max-w-60 lg:max-w-80">
                Atlantic Lubes is a premier quality lubricant product manufacturer and supplier all over the world with certified ISO 9001-2015, ISO 17025-2015, & ISO 14001-2015 17025-BN14013
              </p>
              <div className="flex flex-wrap space-x-2 line pr-3">
             {/**    {Object.keys(siteConfig.socialMedia).map((platform) => (
                  <SocialIcons
                    key={platform}
                    plateform={platform}
                    dark
                    link={siteConfig.socialMedia[platform]}
                  />
                ))}
            */}
                 </div>

              

                {/**  <ul className="flex flex-wrap space-x-2 line pr-3">
                    <li><SocialIcons plateform="facebook" dark link={siteConfig.socialMedia.facebook} /></li>
                    <li><SocialIcons plateform="instagram" dark link={siteConfig.socialMedia.instagram} /></li>
                    <li><SocialIcons plateform="twitter" dark link={siteConfig.socialMedia.twitter} /></li>
                    <li><SocialIcons plateform="linkedin" dark link={siteConfig.socialMedia.linkedin} /></li>
                    <li><SocialIcons plateform="youtube" dark link={siteConfig.socialMedia.youtube} /></li>
                    <li><SocialIcons plateform="vimeo" dark link={siteConfig.socialMedia.vimeo} /></li>
                    <li><SocialIcons plateform="tiktok" dark link={siteConfig.socialMedia.tiktok} /></li>
                    <li><SocialIcons plateform="pinterest" dark link={siteConfig.socialMedia.pinterest} /></li>
                    <li><SocialIcons plateform="snapchat" dark link={siteConfig.socialMedia.snapchat} /></li>
                 </ul>
                  */}
             
            </div>

            {/* Quick Links */}
            <div className="flex flex-col space-y-3">
              <div className="uppercase text-white font-medium py-4 text-xl">Quick Links</div>
             {/* <MenuFooterList /> */} 
            </div>

            {/* Categories */}
            <div className="flex flex-col space-y-3">
              <div className="uppercase text-white font-medium py-4 text-xl">Product Categories</div>
            {/*  <MenuFooterPcategory /> */}   
            </div>

            {/* Get in Touch */}
            <div className="flex flex-col space-y-3">
              <div className="uppercase text-white font-medium py-4 text-xl">Get in Touch</div>
              <p className="text-base text-gray-300 font-light max-w-60">Phone: +971-(06)-5264688</p>
              <p className="text-base text-gray-300 font-light max-w-60">
                Email: <a href="mailto:info@atlanticlubes.com">info@atlanticlubes.com</a>
              </p>
              <div className="uppercase text-white font-medium py-4 text-xl">Head Office</div>
              <p className="text-base text-gray-300 font-light max-w-60">
                <a href="https://maps.app.goo.gl/4SRwewpqge5hYiH9A" target="_blank" rel="noopener noreferrer">
                  Atlantic Grease and Lubricants, Hamriyah Freezone P.O.BOX 41583, Sharjah, United Arab Emirates
                </a>
              </p>
              <p className="text-base text-gray-300 font-light max-w-60">
                <a href="https://maps.app.goo.gl/4SRwewpqge5hYiH9A" target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </p>
            </div>
          </div>
        </PaddingContainer>
      </footer>
    
  );
}

export default Footer;
