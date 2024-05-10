import Image from "next/image"
import PaddingContainer from "./padding-container"
import siteConfig from "@/config/site"
import SocialIcons from "../elements/social-icons"

const Footer = () => {
  return (
    <div>
      
      <footer className="w-full  mt-10 pt-5 pb-8 bg-[#0D0D0D]">

        <PaddingContainer>
            {/* main container */}
            <div className="w-full flex flex-col md:flex-row mt-10 pl-12 md:pl-0 space-y-10 md:space-y-0 justify-between ">
               {/* about company */}
               <div className="flex flex-col space-y-3" >
                  <div className="uppercase text-white font-medium py-4 text-xl">About Company</div>
                  <a href="#" className="w-64"> 
                    <Image
                            src="https://atlanticlubes.com/wp-content/uploads/2023/05/Atlanticlubes-logo.png.webp"
                            width={500}
                            height={300}
                            alt="" />
                  </a>
                   <p className=" text-base text-gray-300 font-light max-w-sm md:max-w-60 lg:max-w-80">Atlantic Lubes is a premier quality lubricant product
                    manufacturer and supplier all over the world with certified ISO 9001-2015,ISO 17025-2015,& !SO 14001-2015 17025-BN14013</p>

                    <div className="flex flex-wrap space-x-2 line pr-3 " >
                        <SocialIcons plateform="facebook" dark  link={siteConfig.socialMedia.facebook} /> 
                        <SocialIcons plateform="instagram"dark link={siteConfig.socialMedia.instagram} /> 
                        <SocialIcons plateform="twitter"dark link={siteConfig.socialMedia.twitter} /> 
                        <SocialIcons plateform="youtube" dark link={siteConfig.socialMedia.youtube} /> 
                        <SocialIcons plateform="linkedin" dark link={siteConfig.socialMedia.linkedin} /> 
                        <SocialIcons plateform="vimeo" dark link={siteConfig.socialMedia.vimeo} /> 
                        <SocialIcons plateform="tiktok" dark link={siteConfig.socialMedia.tiktok} /> 
                        <SocialIcons plateform="pinterest" dark link={siteConfig.socialMedia.pinterest} />
                        <SocialIcons plateform="snapchat" dark link={siteConfig.socialMedia.snapchat} />  
                    </div>
               </div>

               {/* Quick Links */}
               <div className="flex flex-col space-y-3" >
                  <div className="uppercase text-white font-medium py-4 text-xl">Quick Links</div>

                   <ul className="text-gray-300 space-y-1">
                        <li>
                            <a href="#" >Certifications & Approvals </a>
                        </li>
                        <li>
                            <a href="#" >Privacy Policy </a>
                        </li>
                        <li>
                            <a href="#" >Interested Parties </a>
                        </li>
                        <li>
                            <a href="#" >IMS Policy </a>
                        </li>
                        <li>
                            <a href="#" >HSE</a>
                        </li>
                   </ul>
                  
                </div>


                 {/* Categories */}
               <div className="flex flex-col space-y-3" >
                  <div className="uppercase text-white font-medium py-4 text-xl">Product Categories</div>

                   <ul className="text-gray-300 space-y-1">
                        <li>
                            <a href="#" >Certifications & Approvals </a>
                        </li>
                        <li>
                            <a href="#" >Privacy Policy </a>
                        </li>
                        <li>
                            <a href="#" >Interested Parties </a>
                        </li>
                        <li>
                            <a href="#" >IMS Policy </a>
                        </li>
                        <li>
                            <a href="#" >HSE</a>
                        </li>
                   </ul>
                  
                </div>



                 {/* Get in Toch */}
               <div className="flex flex-col space-y-3" >
                  <div className="uppercase text-white font-medium py-4 text-xl">Get in Touch</div>

                    <p className=" text-base text-gray-300 font-light max-w-60">Phone: +971-(06)-5264688</p>
                    <p className=" text-base text-gray-300 font-light max-w-60">Email: info@atlanticlubes.com </p>

                   <div className="uppercase text-white font-medium py-4 text-xl">Head Office</div>
                   <p className=" text-base text-gray-300 font-light max-w-60"> <a href="#"> Atlantic Grease and Lubricants, Hamriyah Freezone P.O.BOX 41583, Sharjah, United Arab Emirates </a> </p>
                   <p className=" text-base text-gray-300 font-light max-w-60"><a href="#">  Open in Google Maps </a> </p>
                  
                </div>




            </div>
        </PaddingContainer>

      </footer>

    </div>
  )
}

export default Footer
