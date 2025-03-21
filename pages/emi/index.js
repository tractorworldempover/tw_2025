import React, { useState } from "react";
import Banner from "@components/Banner";
import Layout from "@components/Layout";
import Heading from "../../components/Heading";
import Table from "@components/Table";
import PieChart from "../../components/PieChart";

export default function EmiCalculator() {
  const breadcrumbData = [
    { label: "Home", link: "/" },
    { label: "EMI CAlculator", link: "#" },
  ];

  // Specifications data
  const [engineData, setEngineData] = useState([
    { label: "Engine HP", value: "49 HP" },
    { label: "PTO HP", value: "44.9 HP" },
    { label: "Wheel drive", value: "2WD" },
    { label: "Forward Gears", value: "2" },
    { label: "Reverse Gears", value: "2" },
    { label: "Brake Type", value: "Oil Immersed" },
    { label: "Price", value: "Check Price" },
  ]);

  const [steeringData, setSteeringData] = useState([
    { label: "Engine HP", value: "niharika" },
    { label: "PTO HP", value: "44.9 HP" },
    { label: "Wheel drive", value: "2WD" },
    { label: "Forward Gears", value: "2" },
    { label: "Reverse Gears", value: "2" },
    { label: "Brake Type", value: "Oil Immersed" },
    { label: "Price", value: "Check Price" },
  ]);
  // end Specifications

  // for accordion
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionData = [
    {
      id: 1,
      heading: "Tractor Loan EMI: What Is It?",
      content: { data: engineData },
    },
    {
      id: 2,
      heading: "Tractor Loan EMI: How Is It Calculated?",
      content: { data: engineData },
    },
    {
      id: 3,
      heading: "Benefits of Using a Tractor Loan EMI Calculator",
      content: { data: engineData },
    },
    {
      id: 4,
      heading: "How to Use Mahindra Finance Tractor Loan EMI Calculator?",
      content: { data: steeringData },
    },
  ];

  return (
    <div>
      <Layout>
        <Banner
          breadcrumbs={breadcrumbData}
          heading={"EMI Calculator"}
          bannerImg={"images/emicalculator/calculator-banner.svg"}
        />
        <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
          <Heading heading={"Tractor Loan EMI Calculator"} />
          <p className="text-sm my-2">
            Calculating your Tractor Loan EMI has never been easier. Use our
            Tractor Loan EMI Calculator to input your desired amount, interest
            rate and tenure, and view an instant summary of your EMI amounts.
            You can also simply adjust the amount and tenure to see how it
            affects your EMI repayments. Make smart investments for your farm
            with our Tractor Loan EMI Calculator
          </p>
        </div>

        <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2">
          <div className="bg-[#F6F6F6] px-3 py-6 mt-3 flex sm:flex-row flex-col gap-4">
            <div className="sm:w-1/2 w-full">
              <div>
                <div className="flex ">
                  <label htmlFor="loanAmount" className="form-label mr-4">
                    Loan Amount
                  </label>
                  <input
                    type="text"
                    className="px-3 py-2 border rounded-md ml-auto text-center"
                    value="340000"
                  />
                </div>
                <div>
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="780000"
                    step="1000"
                    id="loanAmount"
                  />
                </div>
                <div className="flex ">
                  <label htmlFor="tenure" className="form-label ">
                    ₹1L
                  </label>
                  <label htmlFor="tenure" className="form-label ml-auto ">
                    ₹25L
                  </label>
                </div>
              </div>

              <div className="py-6">
                <div className="flex ">
                  <label htmlFor="tenure" className="form-label mr-4">
                    Tenure (Months)
                  </label>
                  <input
                    type="text"
                    className="px-3 py-2 border rounded-md ml-auto text-center"
                    value="12"
                  />
                </div>
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max="780000"
                  step="1000"
                  id="tenure"
                />

                <div className="flex py-2 ">
                  <label htmlFor="tenure" className="form-label ">
                    12
                  </label>
                  <label htmlFor="tenure" className="form-label ml-auto ">
                    60
                  </label>
                </div>
                <hr></hr>

                <div className="py-2 flex items-center justify-between">
                  <label>Monthly EMI</label>
                  <label className="flex-grow text-center">₹ 29,341</label>
                  <button className="ml-auto font-bold border border-gray-500 px-4 py-2 rounded bg-[#652178] text-white">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
            {/* pei chart */}
            {/* <div className="flex">
              <div className="sm:w-1/2 w-full">
                <div className="max-w-md mx-auto ml-20">
                  <div className="relative w-64 h-64 bg-[#F37021] rounded-full overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-black mb-2">
                        Total Amount Payable
                      </span>
                      <span className="text-black text-lg font-bold">
                        ₹ 3,52,090
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-32 flex flex-col justify-center items-center mb-10">
                <ul className="list-disc list-inside">
                  <li>
                    <span className="text-gray-700">Principal Amount</span>
                    <span className="font-bold block">₹ 3,40,000</span>
                  </li>
                  <li>
                    <span className="text-gray-700">Total Amount</span>
                    <span className="font-bold block">₹ 3,52,090</span>
                  </li>
                </ul>
              </div>
            </div> */}
            <div>
              <PieChart />
            </div>
          </div>
        </div>

        <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
          <div
            className="mt-4"
            id="accordion-collapse"
            data-accordion="collapse"
          >
            {accordionData.map((item) => (
              <div key={item.id}>
                <h2
                  id={`accordion-collapse-heading-${item.id}`}
                  className="mt-3"
                >
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-3
                                font-semibold rtl:text-right border bg-[#EEEEF0]
                                border-gray-200 focus:ring-4 focus:ring-gray-200
                                dark:focus:ring-gray-800 dark:border-gray-700
                                dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800
                                gap-3"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={openAccordion === item.id}
                    aria-controls={`accordion-collapse-body-${item.id}`}
                  >
                    <span>{item.heading}</span>
                    <svg
                      data-accordion-icon
                      className={`w-3 h-3 ${
                        openAccordion === item.id ? "rotate-180" : ""
                      } shrink-0`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>

                <div
                  id={`accordion-collapse-body-${item.id}`}
                  className={`${openAccordion === item.id ? "" : "hidden"}`}
                  aria-labelledby={`accordion-collapse-heading-${item.id}`}
                >
                  <div className="border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <Table data={item.content.data} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
