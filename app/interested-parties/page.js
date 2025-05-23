
import PaddingContainer from "../components/layout/padding-container";
import { generateMetadata as generatePageMetadata } from "@/libs/metadata";
import siteConfig from "@/config/site";


export async function generateMetadata(props) {
  const params = await props.params;


  const metadataParams = {
      pageTitle: "Interested Parties",
      pageSlug: "iinterested-parties",
      pageDescription: "Interested Parties INTERESTED PARTIES NEEDS &amp; EXPECTATIONS – IMS COMMITMENT   Interested party Their needs and expectations Our commitments to them IMS Processes Customers Quality Price Delivery of products and services Orders accurately taken Products arrive on time All products specifications met Sales and customer service process Inspection process Suppliers Increase scope and volume of purchase",
      seoTitle: "Atlantic Interested Parties",
      seoDescription: "Interested Parties INTERESTED PARTIES NEEDS &amp; EXPECTATIONS – IMS COMMITMENT   Interested party Their needs and expectations Our commitments to them IMS Processes Customers Quality Price Delivery of products and services Orders accurately taken Products arrive on time All products specifications met Sales and customer service process Inspection process Suppliers Increase scope and volume of purchase",
      rebotStatus: false,
      canonicalLinks: "iinterested-parties",
      dataPublishedTime: "15-8-2024",
      category: "",
      image: siteConfig.logoImage,
      imageAlternativeText: "Atlantic logo",
      imageExt: ".png",
  };

  return await generatePageMetadata({ type: "page", path: "", params: metadataParams });
}


const InterestedParties = () => {

    return (
        <div>

            <PaddingContainer className="flex flex-col text-white " >

                <h1 className="text-white pt-32 font-medium text-3xl ">Interested Parties</h1>
                <span className=" block text-gray-100 pb-3  font-normal text-xl ">INTERESTED PARTIES NEEDS & EXPECTATIONS – IMS COMMITMENT</span>
               
                <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Interested party</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Their needs and expectations</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Our commitments to them</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">IMS Processes</th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          <tr>
            <th className="px-6 py-4 text-md font-medium text-white">Customers</th>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Quality</li>
                <li>Price</li>
                <li>Delivery of products and services</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Orders accurately taken</li>
                <li>Products arrive on time</li>
                <li>All products specifications met</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Sales and customer service process</li>
                <li>Inspection process</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th className="px-6 py-4 text-md font-medium text-white">Suppliers</th>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Increase scope and volume of purchase</li>
                <li>Long-term contractual arrangements</li>
                <li>Information of future requirements</li>
                <li>Mutual benefit and continuity</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Accurate purchase orders</li>
                <li>Correct flow down of requirements</li>
                <li>Timely payment of invoices</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Purchasing process</li>
                <li>Accounts payable process</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th className="px-6 py-4 text-md font-medium text-white">Employees</th>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Good work environment</li>
                <li>Job security</li>
                <li>Health / safety / training</li>
                <li>Promotion / recognition and reward</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Clean safe work environment</li>
                <li>Clear instructions and training</li>
                <li>Paychecks accurate and on time</li>
                <li>Resolution of grievances</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Training process</li>
                <li>Human resources process</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th className="px-6 py-4 text-md font-medium text-white">Management</th>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Increased growth, sales & profitability</li>
                <li>Efficiency & effectiveness of operations</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Correct and current information for decision making</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Management review process</li>
                <li>Analysis of data</li>
                <li>Internal audits</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th className="px-6 py-4 text-md font-medium text-white">Regulatory Bodies</th>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Compliance with applicable requirements and industry standards / submission of reports</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Regulatory compliance</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Listing of applicable regulations</li>
                <li>Regulatory compliance process</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th className="px-6 py-4 text-md font-medium text-white">Government</th>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Environmental protection/Ethical behaviour</li>
                <li>Growth in business and taxes to build infrastructure to support community services, activities, and institutions</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Compliance with federal laws</li>
              </ul>
            </td>
            <td className="px-6 py-4 text-md text-gray-200">
              <ul className="list-disc pl-5 font-light">
                <li>Appropriate Code of Federal Regulations</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


            </PaddingContainer>


        </div>
    )
}

export default InterestedParties
