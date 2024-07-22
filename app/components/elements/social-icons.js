import Link from 'next/link'
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaPinterestSquare, FaSnapchatSquare, FaTwitterSquare, FaVimeoSquare, FaYoutube, FaYoutubeSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";


 const SocialIcons = ({plateform, link, dark= false }) => {
    

    const getIcon = (plateform)=>{
        switch(plateform)
        {
            case "facebook":
                return   <FaFacebook size={`${dark ? "18" : "20"}`} />
            case "twitter":
                 return <FaTwitterSquare size={`${dark ? "18" : "20"}`} />
            case "linkedin":
                return  <FaLinkedin size={`${dark ? "18" : "20"}`} />
            case "instagram":
                 return  <FaInstagramSquare size={`${dark ? "18" : "20"}`} />
            case "youtube":
                 return  <FaYoutubeSquare  size={`${dark ? "18" : "20"}`} />
            case "vimeo":
                 return  <FaVimeoSquare size={`${dark ? "18" : "20"}`} /> 
            case "tiktok":
                 return  <AiFillTikTok size={`${dark ? "18" : "20"}`} />
            case "pinterest":
                 return  <FaPinterestSquare  size={`${dark ? "18" : "20"}`} /> 
            case "snapchat":
                 return  <FaSnapchatSquare  size={`${dark ? "18" : "20"}`} /> 
           
        }
    };

    const getName = (plateform)=>{
     switch(plateform)
     {
         case "facebook":
             return   "Facebook"
         case "twitter":
              return "Twitter"
         case "linkedin":
              return "Linkedin"
         case "instagram":
               return "Instagram"
         case "youtube":
               return "Youtube"
         case "vimeo":
               return "Vimeo" 
         case "tiktok":
               return "Tiktok"
         case "pinterest":
               return "Pinterest"
         case "snapchat":
               return "Snapchat"
        
     }
 };


    if (dark) {
        return (
             
                <Link href={link} target="_blank" className="text-black " 
                aria-label={`Follow us on ${getName(plateform)}`}  
                  > 
                <div className=' flex  justify-center items-center bg-white w-8 h-8  hover:bg-gray-200  rounded-full ' >
                   { getIcon(plateform) } 
                   </div>
               </Link>
             
        )
        
              
      } else {
        return  <Link href={link} target="_blank" aria-label={`Follow us on ${getName(plateform)}`}  className="text-white hover:text-gray-200" >   { getIcon(plateform) } </Link>
        
      }

    
}

export default SocialIcons
