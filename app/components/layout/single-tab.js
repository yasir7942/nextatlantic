

"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import PaddingContainer from "./padding-container";
import BodyDataParse from "../elements/data-parse-content";
import FAQs from "./faqs";



const SingleTab = ({ heading = "", text = "", faq = [] }) => {




    return (
        <>


            <div className="w-full mt-6   text-center h-auto">


                <Accordion type="single" collapsible  >

                    <AccordionItem value="1" key="1" className="w-full"  >
                        <AccordionTrigger className=" no-underline hover:no-underline font-semibold   text-white text-left  text-base   border border-1 border-gray-300 shadow-md rounded-sm p-4" >{heading}</AccordionTrigger>
                        <AccordionContent className="  text-white text-left  text-base font-light   " >
                            {text && <div className="text-white font-normal text-sm  pb-10 rich-text    border-[1px] border-gray-600 border-spacing-1  shadow-lg mt-5  p-4">
                                <BodyDataParse content={text} />
                            </div>}

                        </AccordionContent>
                    </AccordionItem>

                    {faq && faq.length > 0 &&

                        <AccordionItem value="2" key="2" className="w-full"  >
                            <AccordionTrigger className=" no-underline hover:no-underline font-semibold   text-white text-left  text-base   border border-1 border-gray-300 shadow-md rounded-sm p-4" >FAQs</AccordionTrigger>
                            <AccordionContent className="  text-white text-left  text-base font-light   " >
                                <FAQs faqList={faq} />
                            </AccordionContent>
                        </AccordionItem>

                    }
                </Accordion>

            </div >
        </>
    )
}

export default SingleTab




