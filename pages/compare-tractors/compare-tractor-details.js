import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Btn from "@components/Btn";
import Image from "next/image";
import Table from "@components/Table";
import Heading from "@components/Heading";
import Tab from '@components/Tab';
import CompareImage from '@Images/liveInventory/compareImage.svg';
import closeIcon from '@Images/closeIcon.svg';
import BannerImg from '@Images/compareTractorImg/Compare_tractor_banner.svg';
import vs from '@Images/compareTractorImg/vs.svg';
import { useRouter } from 'next/router';
import { getLocaleProps } from "@helpers";
import { useTranslation } from 'next-i18next';
import { calculateEMI, formatPrice, getHomePageTractorsListBasedOnInventory } from "@utils";


export async function getServerSideProps(context) {
    return await getLocaleProps(context);
}

export default function CompareTractorDetails({ locale, inventoryData }) {


    const router = useRouter();
    const { t1, t2, id1, id2 } = router.query; // Extract query parameters
    const { t, i18n } = useTranslation('common');
    const [brandNames, setBrandNames] = useState([]);

    const breadcrumbData = [
        { label: 'Home', link: '/' },
        { label: 'Compare Tractor', link: '#' },
    ];

    const [tractorDetails, setTractorDetails] = useState([]);
    const [specifications1, setSpecifications1] = useState([]);
    const [specifications2, setSpecifications2] = useState([]);
    const [wheelsData1, setwheelsData1] = useState([]);
    const [wheelsData2, setwheelsData2] = useState([]);
    const [otherDetailsData1, setotherDetailsData1] = useState([]);
    const [otherDetailsData2, setotherDetailsData2] = useState([]);
    const [steeringData, setSteeringData] = useState([]);
    const [SimilarTractorsListData, setSimilarTractorsListData] = useState([]);

    useEffect(() => {
        if (id1 && id2 && inventoryData.length > 0) {
            const tractor1 = inventoryData.find(tractor => tractor.tractor_id === Number(id1));
            const tractor2 = inventoryData.find(tractor => tractor.tractor_id === Number(id2));

            console.log("tractor1" + JSON.stringify(tractor1));
            console.log("tractor2" + JSON.stringify(tractor2));


            if (tractor1 && tractor2) {
                // 🖼️ Format imagesData for UI
                const imagesData = [
                    {
                        name: `${tractor1.brand} ${tractor1.model}`,
                        emiStartsFrom: calculateEMI(tractor1.max_price),
                        price: formatPrice(tractor1.max_price),
                        checkPrice: "Check Tractor Price",
                        image: "/images/compareTractorImg/mahindra.svg", // Replace with actual image
                        tractorId: tractor1.tractor_id
                    },
                    {
                        name: `${tractor2.brand} ${tractor2.model}`,
                        emiStartsFrom: calculateEMI(tractor2.max_price),
                        price: formatPrice(tractor2.max_price),
                        checkPrice: "Check Tractor Price",
                        image: "/images/compareTractorImg/massey.svg", // Replace with actual image
                        tractorId: tractor1.tractor_id
                    }
                ];

                setTractorDetails(imagesData);
                setBrandNames(imagesData.map(item => item.name));

                const createTableData = (tractor, fields) =>
                    fields.map(field => ({
                        tablData: [
                            { td: field.label },
                            { td: `${tractor[field.key]}` }
                        ]
                    }));

                const specFields = [
                    { label: "Engine HP", key: "engine_power" },
                    { label: "Engine Hours", key: "engine_hours" },
                    { label: "Engine Condition", key: "engine_condition" }
                ];

                const wheelFields = [
                    { label: "Tyre Condition", key: "tyre_condition" },
                    { label: "Tyre State", key: "tyre_state" }
                ];

                const otherFields = [
                    { label: "Buying Year", key: "buying_year" }
                ];

                setSpecifications1(createTableData(tractor1, specFields));
                setSpecifications2(createTableData(tractor2, specFields));

                setwheelsData1(createTableData(tractor1, wheelFields));
                setwheelsData2(createTableData(tractor2, wheelFields));

                setotherDetailsData1(createTableData(tractor1, otherFields));
                setotherDetailsData2(createTableData(tractor2, otherFields)); 

                // const createSpecData = (tractor) => [
                //     {
                //         tablData: [
                //             { td: `Engine HP` },
                //             { td: `${tractor.engine_power}` },
                //         ]
                //     },
                //     {
                //         tablData: [
                //             { td: `Engine Hours` },
                //             { td: `${tractor.engine_hours}` },
                //         ]
                //     },
                //     {
                //         tablData: [
                //             { td: `Engine Condition` },
                //             { td: `${tractor.engine_condition}` },
                //         ]
                //     }
                // ];

                // const createWheelsData = (tractor) => [
                //     {
                //         tablData: [
                //             { td: `Tyre Condition`},
                //             { td: `${tractor.tyre_condition}` },
                //         ]
                //     },
                //     {
                //         tablData: [
                //             { td: `Tyre State`},
                //             { td: `${tractor.tyre_state}` },
                //         ]
                //     },
                //     // {
                //     //     tablData: [
                //     //         { td: `Engine Condition` },
                //     //         { td: `${tractor.engine_condition}` },
                //     //     ]
                //     // }
                // ];

                // const createotherData = (tractor) => [
                //     {
                //         tablData: [
                //             { td: `Buying Year`},
                //             { td: `${tractor.buying_year}` },
                //         ]
                //     }, 

                // ];

                // setSpecifications1(createSpecData(tractor1));
                // setSpecifications2(createSpecData(tractor2)); 

                // setwheelsData1(createWheelsData(tractor1));
                // setwheelsData2(createWheelsData(tractor2)); 

                // setotherDetailsData1(createotherData(tractor1));
                // setotherDetailsData2(createotherData(tractor2)); 

            }
        }
    }, [id1, id2, inventoryData]);

    const accordionData = [
        { id: 1, heading: "Engine", content: { tractor1data: specifications1, tractor2data: specifications2 } },
        { id: 2, heading: "Wheels And Tires", content: { tractor1data: wheelsData1, tractor2data: wheelsData2 } },
        { id: 3, heading: "Other Information", content: { tractor1data: otherDetailsData1, tractor2data: otherDetailsData1 } },
    ];

    // for accordion
    const [openAccordion, setOpenAccordion] = useState(1);
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    //similarTractors
    useEffect(() => {
        if (inventoryData.length > 0 && id1 && id2) {
            const tractor1 = inventoryData.find(t => Number(t.tractor_id) === Number(id1));
            const tractor2 = inventoryData.find(t => Number(t.tractor_id) === Number(id2));

            if (!tractor1 || !tractor2) {
                console.warn("One or both tractors not found in inventoryData");
                return;
            }

            const enginePower1 = tractor1?.engine_power;
            const enginePower2 = tractor2?.engine_power;

            let filteredSimilarTractors = inventoryData
                .filter(item =>
                    (item.engine_power === enginePower1 || item.engine_power === enginePower2) &&
                    item.tractor_id !== Number(id1) &&
                    item.tractor_id !== Number(id2)
                )
                .slice(0, 10) // ✅ Limit results to 10 similar tractors
                .map(item => ({
                    title: `${item.brand} ${item.model}`,
                    price: item.max_price,
                    engineHours: item.engine_hours,
                    driveType: item.drive_type,
                    enginePower: item.engine_power,
                    tractorId: item.tractor_id,
                }));

            setSimilarTractorsListData(filteredSimilarTractors);
            // console.log(JSON.stringify(SimilarTractorsListData) + "SimilarTractorsListData");
        }
    }, [id1, id2, inventoryData]); // ✅ Runs only when these values change


    // 🏗️ Pass filtered data for comparison
    const compareTractorData = getHomePageTractorsListBasedOnInventory(SimilarTractorsListData);

    console.log("compareTractorData" + JSON.stringify(compareTractorData));


    const [activeTab, setActiveTab] = useState("oneData");
    // Automatically highlight the first available tab from compareTractorData
    useEffect(() => {
        const availableTabs = Object.keys(compareTractorData);
        if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
            setActiveTab(availableTabs[0]); // Set the first available tab
        }
    }, [compareTractorData]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };


    return (
        <div>
            <Layout currentPage={"compare"}>
                <Banner
                    breadcrumbs={breadcrumbData}
                    heading={"Compare Tractor Details"}
                    bannerImg={BannerImg}
                />
                <div className="w-full bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">

                    <div className="w-full flex grid-cols-1 sm:flex-row sm:items-start items-center flex-col sm:gap-10 gap-4 justify-between">
                        {tractorDetails.map((tractor, index) => (
                            <>
                                {index > 0 && (
                                    <div className='m-auto sm:w-[100px] sm:h-[100px] h-[40px] w-[40px]'>
                                        <Image src={vs} alt='vs' layout="responsive" />
                                    </div>
                                )}

                                <div className="w-full">
                                    <div key={index} className="bg-[#FBFBFB] shadow-lg w-full">
                                        <div className="relative p-2">
                                            <Image src={tractor.image}
                                                alt="image"
                                                width={301}
                                                height={173}
                                                layout="responsive"
                                            />
                                            {/* <div className="absolute top-2 right-2">
                                                <Image src={closeIcon} width={20} height={20} className="cursor-pointer" />
                                            </div> */}
                                        </div>
                                        <div className="p-4 bg-[#FBFBFB]">
                                            <h3 className="text-[14px]  text-[#000000]">{tractor.name}</h3>
                                            <p className="text-[14px]  text-secondaryColor mt-2">{tractor.emiStartsFrom}</p>
                                            <p className="text-[14px] text-[#000000]  mt-2">{tractor.price}</p>
                                            <p className="text-[14px] text-primaryColor  mt-2 inline-block cursor-pointer">
                                                <a href="/interested">Enquire</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}

                    </div>

                    {/* <div className='mt-4 w-full flex justify-end'>
                        <div className='sm:w-[15%] w-full'>
                            <Btn text={'COMPARE'} bgColor={true} />
                        </div>
                    </div> */}


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
                                            className={`w-3 h-3 ${openAccordion === item.id ? "rotate-180" : ""
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
                                        <div className="grid sm:grid-cols-2 sm:gap-20 gap-10 p-4">
                                            <div>
                                                <p className="mb-2 text-xl font-bold text-primaryColor">{brandNames[0]}</p>
                                                <Table data={item.content.tractor1data} />
                                            </div>
                                            <div>
                                                <p className="mb-2 text-xl font-bold text-primaryColor">{brandNames[1]}</p>
                                                <Table data={item.content.tractor2data} /> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>



                    <div className="my-4">
                        <Heading heading={'Tractors in 2024'} />
                    </div>

                    {/* <div className='flex sm:gap-4 gap-2 my-3 font-medium'>
                        <Tab id="oneData" activeTab={activeTab} onClick={handleTabClick}>
                            Popular</Tab>
                        <Tab id="twoData" activeTab={activeTab} onClick={handleTabClick}>Latest</Tab>
                        <Tab id="ThreeData" activeTab={activeTab} onClick={handleTabClick}>Upcoming</Tab>
                    </div> */}

                    <div className="">
                        <div className='grid sm:grid-cols-3 grid-cols-1 xl:gap-8 gap-4'>
                            {Object.keys(compareTractorData).map((key) =>
                                activeTab === key ? (
                                    <>
                                        {compareTractorData[activeTab]?.slice(0, 3).map((item, index) => (
                                            <div key={index} className=' shadow p-2 overflow-hidden flex-none'>
                                                <Image src={CompareImage} alt='compareImage' layout="responsive" />
                                                <div className='flex justify-between px-3 mb-3'>
                                                    <div>
                                                        <div>{item.brand1}</div>
                                                        <div className='font-semibold my-1'>{item.brand1hrs}</div>
                                                        <div className='font-semibold my-1'>{formatPrice(item.brand1price)}</div>

                                                    </div>
                                                    <div>
                                                        <div>{item.brand2}</div>
                                                        <div className='font-semibold my-1'>{item.brand2hrs}</div>
                                                        <div className='font-semibold my-1'>{formatPrice(item.brand2price)}</div>

                                                    </div>
                                                </div>
                                                {/* <Btn className="uppercase" text={'COMPARE'} /> */}
                                            </div>
                                        ))}
                                    </>
                                ) : null
                            )}
                        </div>

                        <div className='flex justify-center my-6'>
                            <a href="/compare-tractors"><Btn text={t('Home.View_All_Tractor_Comparison')} bgColor={true} /></a>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}