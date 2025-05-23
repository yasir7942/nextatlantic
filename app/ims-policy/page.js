
import PaddingContainer from "../components/layout/padding-container";
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import siteConfig from "@/config/site";


export async function generateMetadata(props) {
    const params = await props.params;


    const metadataParams = {
        pageTitle: "IMS Policy",
        pageSlug: "ims-policy",
        pageDescription: "INTEGRATED MANAGEMENT SYSTEM At Atlantic Grease &amp; Lubricants, we are committed to providing our customers with high-quality, innovative, and environmentally-friendly lubricants with an integrated system. Our Integrated Management System (IMS) is designed to guide and manage our company&#8217;s operations and promote a healthy and safe workplace for our employees and customers. Our IMS policies cover Quality, Occupational ",
        seoTitle: "Atlantic IMS Policy",
        seoDescription: "INTEGRATED MANAGEMENT SYSTEM At Atlantic Grease &amp; Lubricants, we are committed to providing our customers with high-quality, innovative, and environmentally-friendly lubricants with an integrated system. Our Integrated Management System (IMS) is designed to guide and manage our company&#8217;s operations and promote a healthy and safe workplace for our employees and customers. Our IMS policies cover Quality, Occupational ",
        rebotStatus: false,
        canonicalLinks: "ims-policy",
        dataPublishedTime: "15-8-2024",
        category: "",
        image: siteConfig.logoImage,
        imageAlternativeText: "Atlantic logo",
        imageExt: ".png",
    };

    return await generatePageMetadata({ type: "page", path: "", params: metadataParams });
}


const IMSPolicy = () => {

    return (
        <div>

            <PaddingContainer className="flex flex-col text-white " >

                <h1 className="text-white pt-32 font-medium text-3xl ">INTEGRATED MANAGEMENT SYSTEM</h1>
                <p className="text-white pt-3 font-light text-lg tracking-wider  ">
                    At Atlantic Grease & Lubricants, we are committed to providing our customers with high-quality, innovative, and environmentally-friendly lubricants with an integrated system. Our Integrated Management System (IMS) is designed to guide and manage our company’s operations and promote a healthy and safe workplace for our employees and customers.
                    <br /><br />
                    Our IMS policies cover Quality, Occupational Health and Safety, Environmental, Information Security, and Customer Satisfaction. We continuously work towards the improvement and enhancement of our management systems to meet the needs of our customers and all other stakeholders.
                    <br /><br />
                    Our IMS is certified by internationally recognized standards such as ISO 9001, ISO 17025 & ISO 14001/EMS 2015 17025-BN14013. We ensure that our policies and regulations comply with all legal requirements, and we communicate the importance of meeting customer needs to our employees to embrace customer satisfaction as a core value.
                    <br /><br />
                    We strive to create a work environment that encourages our employees to perform their best and provides them with all the necessary resources to meet the expectations of our stakeholders. Our goal is to foster a culture of continuous improvement that will enable us to maintain industry standards and surpass customer expectations.

                    <strong className="block text-2xl pt-3">MANAGEMENT POLICY</strong>
                    At Atlantic Grease & Lubricants, we are committed to enhancing the productivity of our customers through the provision of high-quality lubricants. We aim to deliver on this objective by engaging in the following:
                </p>
                <ul className="list-disc pl-5 font-light text-lg text-white">
                    <li>Train our employees in quality, cost, productivity, customer orientation, and occupational health and safety.</li>
                    <li>Adhere to all legal and applicable requirements.</li>
                    <li>Protect the health and safety of our employees, visitors, and the local community by eliminating risks related to occupational health and safety.</li>
                    <li>Protect the environment by reducing natural resource losses and waste.</li>
                    <li>Prevent any discrepancies from materializing in our work and take action to ensure it does not repeat in the future.</li>
                    <li>Make efforts to achieve full customer satisfaction.</li>
                    <li>Address any issues promptly with the involvement of our entire scope of staff.</li>
                    <li>Support our customers with post-sales technical services.</li>
                    <li>Establish and adhere to information security standards.</li>
                    <li>Provide the necessary resources to improve the effectiveness of our management system consistently.</li>
                </ul>
                <p className="text-white pt-3 font-light text-lg tracking-wider pb-10 ">
                    Our IMS and management policies ensure that we maintain the highest quality in our products and services while demonstrating our commitment to employees, customers, and stakeholders.
                </p>

            </PaddingContainer>


        </div>
    )
}

export default IMSPolicy
