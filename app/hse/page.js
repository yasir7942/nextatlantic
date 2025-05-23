
import PaddingContainer from "../components/layout/padding-container";
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import siteConfig from "@/config/site";


export async function generateMetadata(props) {
    const params = await props.params;


    const metadataParams = {
        pageTitle: "HSE",
        pageSlug: "hse",
        pageDescription: "HSE at Atlantic Grease &#038; Lubricants The purpose of HSE at Atlantic Grease &amp; Lubricants is to develop the industry&#8217;s best-recognized practices for the safety of employees and environmental health. Atlantic Grease &amp; Lubricants (AGL) is committed to promoting a healthy, safe, secure, and sustainable environment. We take all reasonable and practical measures to prevent  ",
        seoTitle: "Atlantic HSE",
        seoDescription: "HSE at Atlantic Grease &#038; Lubricants The purpose of HSE at Atlantic Grease &amp; Lubricants is to develop the industry&#8217;s best-recognized practices for the safety of employees and environmental health. Atlantic Grease &amp; Lubricants (AGL) is committed to promoting a healthy, safe, secure, and sustainable environment. We take all reasonable and practical measures to prevent  ",
        rebotStatus: false,
        canonicalLinks: "hse",
        dataPublishedTime: "15-8-2024",
        category: "",
        image: siteConfig.logoImage,
        imageAlternativeText: "Atlantic logo",
        imageExt: ".png",
    };

    return await generatePageMetadata({ type: "page", path: "", params: metadataParams });
}


const HSE = () => {

    return (
        <div>

            <PaddingContainer className="flex flex-col text-white " >

                <h1 className="text-white pt-32 font-medium text-3xl ">HSE at Atlantic Grease & Lubricants</h1>
                <p className="text-white pt-3 font-light text-lg tracking-wider  ">
                    The purpose of HSE at Atlantic Grease & Lubricants is to develop the industry’s best-recognized practices for the safety of employees and environmental health.
                    <br /> 
                    Atlantic Grease & Lubricants (AGL) is committed to promoting a healthy, safe, secure, and sustainable environment. We take all reasonable and practical measures to prevent and eliminate the risk of injuries, health hazards, and damage to properties.

                    <strong className="block text-2xl pt-3">Health Safety & Environment Goals</strong>
                    Our commitment to HSE includes the following objectives:
                </p>
                <ul className="list-disc pl-5 font-light text-lg text-white">
                    <li>Ensuring the safety and well-being of all employees, customers, and the general public</li>
                    <li>Preventing spills, environmental incidents, and other risks associated with our operations</li>
                    <li>Identifying and mitigating key environmental risks</li>
                    <li>Promoting healthy workplaces and mitigating significant health risks</li>
                    <li>Operating incident-free, with industry-leading asset reliability</li>
                    <li>Maximizing the efficient use of resources and assets</li>
                </ul>
                <p className="text-white pt-3 font-light text-lg tracking-wider pb-10 ">
                    At AGL, all incidents are preventable, and we strive to maintain a culture of safety and environmental responsibility across all levels of the organization. Our leaders at all levels are responsible and accountable for HSE, its compliance, and managing risks in their respective areas.
                    <br /><br />
                    To ensure worker protection and well-being, we provide appropriate training and information to all employees, encourage them to accept individual responsibility for HSE, and implement best practices in their daily work. We also strive to protect the environment by adopting best practices that reduce emissions, promote recycling, and minimize pollution and waste.
                    <br /><br />
                    We are committed to being vigilant and prepared for emergencies and responding promptly and appropriately to possible incidents. We regularly benchmark industry best practices to identify improvement opportunities and continuously review and audit our HSE management system and operations to monitor progress and compliance. We also incorporate newer-generation technology and advanced management systems. We learn from events, accidents, and close calls and constantly identify substandard conditions to improve our HSE performance and management processes.
                    <br /><br />
                    By adhering to these principles and objectives, AGL is committed to promoting a culture of safety, sustainability, and environmental responsibility that benefits our employees, customers, and the communities in which we operate.
                    <br /><br />
                    Atlantic Grease & Lubricants recognizes the importance of maintaining high standards of Health, Safety, and Environment (HSE) within the lubricants industry. We actively participate in the HSE international standards as part of our commitment to these principles.


                </p>

            </PaddingContainer>


        </div>
    )
}

export default HSE
