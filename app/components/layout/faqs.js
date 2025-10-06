
"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import PaddingContainer from "./padding-container";


const FAQs = ({ faqList }) => {


    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqList.map((data) => ({
            "@type": "Question",
            "name": data.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": data.answer,
            },
        })),
    };


    return (
        <>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="w-full mt-10 mb-10 text-center h-auto">



                <Accordion type="single" collapsible>
                    {faqList.map((data) => (
                        <AccordionItem key={data.id} value={data.id}>
                            <AccordionTrigger className="  text-white text-left  text-base font-normal" >Q: {data.question}</AccordionTrigger>
                            <AccordionContent className="  text-white text-left  text-base font-light" >
                                A: {data.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}

                </Accordion>

            </div >
        </>
    )
}

export default FAQs




