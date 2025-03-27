import React, { useState, useRef, useEffect, useReducer, useMemo } from 'react'
import Banner from '@components/Banner';
import Layout from '@components/Layout';
import InventoryCarousel from '@components/InventoryCarousel';
import Image from 'next/image';
import Heading from '@components/Heading';
import Btn from '@components/Btn';
import Warranty from '@Images/home/warranty.svg';
import EasyEMI from '@Images/home/easyEMI.svg';
import Documenting from '@Images/home/documenting.svg';
import Finance from '@Images/home/finance.svg';
import WhyChoose from '@Images/home/whyChoose.svg';
import Loader from '@components/Loader';
import CompareImage from '@Images/liveInventory/compareImage.svg';
import bannerImg from '@Images/liveInventory/banner.svg';
import { getLocaleProps } from "@helpers";
import DefaultTractor from "@Images/default_tractor.svg";
import LiveInventoryContainer from '@components/LiveInventory';
import Tab from '@components/Tab';
import { GET_LIVE_INVENTORY, GET_LIVE_INVENTORY_BYSEARCH } from '@utils/constants';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import LeftSection from '@components/EMI/LeftSection';
import RightSection from '@components/EMI/RightSection';
import HP from '@Images/hp.svg';
import userDataSlice from '@store/userDataSlice';
import { useTranslation } from 'next-i18next';
import { getHomePageTractorsListBasedOnInventory, formatPrice, HomeHPRanges, getTabLabel } from '@utils';
import Link from 'next/link';

export async function getServerSideProps(context) {
    return await getLocaleProps(context);
}
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <Image src='images/slickslider/right_arrow.svg' width={100} height={100} className={'custom-arrow next-arrow'} alt='RightArrow' onClick={onClick}></Image>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <Image src='images/slickslider/left_arrow.svg' width={100} height={100} className={'custom-arrow prev-arrow'} alt='LeftArrow' onClick={onClick}></Image>
    );
}


export default function TractorDetails({ locale, inventoryData }) {

    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const { slug } = router.query;
    const currentLanguage = locale;
    const language = locale?.toUpperCase();
    const [TractorDetails, setTractorDetails] = useState([]);
    const [similarTractorsList, setsimilarTractorsData] = useState([]);
    const [compareTractorsData, setcompareTractorsData] = useState([]);
    const [state, dispatch] = useReducer(userDataSlice, initialState);
    const { t, i18n } = useTranslation('common');
    const Id = Number(slug);

    console.log("nmyid=================="+Id);
    

   

    // const slugQuery = slug.replace('-', ' ');

    const breadcrumbData = [
        { label: 'Home', link: '/' },
        { label: 'Tractor Brand', link: '/inventory' },
    ];

    //   Features data
    const [features, setFeatures] = useState([
        {
            src: '/images/liveInventory/features/battery.png',
            alt: 'Battery',
            title: 'Battery',
            description: 'Available'
        },
        {
            src: '/images/liveInventory/features/calender.png',
            alt: 'Year',
            title: 'Year',
            description: '2022'
        },
        {
            src: '/images/liveInventory/features/hours.png',
            alt: 'Engine Hours',
            title: 'Engine Hours',
            description: '729 Hrs'
        },
        {
            src: '/images/liveInventory/features/enginepower.png',
            alt: 'Engine HP',
            title: 'Engine HP',
            description: '32 HP'
        },
        {
            src: '/images/liveInventory/features/original_tyre.png',
            alt: 'Tyre Condition',
            title: 'Tyre Condition',
            description: 'Original'
        },
        {
            src: '/images/liveInventory/features/reward.png',
            alt: 'Finance',
            title: 'Finance',
            description: 'Upto* 75%'
        }
    ]);

    // tractor data


    // Specifications data
    const [engineData, setEngineData] = useState([
        { label: 'Engine HP', value: '49 HP' },
        { label: 'PTO HP', value: '44.9 HP' },
        { label: 'Wheel drive', value: '2WD' },
        { label: 'Forward Gears', value: '2' },
        { label: 'Reverse Gears', value: '2' },
        { label: 'Brake Type', value: 'Oil Immersed' },
        { label: 'Price', value: 'Check Price' },
    ]);

    const [steeringData, setSteeringData] = useState([
        { label: 'Engine HP', value: 'niharika' },
        { label: 'PTO HP', value: '44.9 HP' },
        { label: 'Wheel drive', value: '2WD' },
        { label: 'Forward Gears', value: '2' },
        { label: 'Reverse Gears', value: '2' },
        { label: 'Brake Type', value: 'Oil Immersed' },
        { label: 'Price', value: 'Check Price' },
    ]);

    const WhyChooseItems = [
        { src: Warranty, alt: "choose1", label: "Warranty" },
        { src: EasyEMI, alt: "EasyEMI", label: "Easy EMi & Pricing" },
        { src: Documenting, alt: "Documenting", label: "Documenting" },
        { src: Finance, alt: "Finance", label: "Mahendra Financing" }
    ];

    const [activeTab, setActiveTab] = useState("oneData");

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    // for accordion 
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    // accordionData
    const accordionData = [
        { id: 1, heading: 'ENGINE', content: { data: engineData } },
        { id: 2, heading: 'TRANSMISSION (GEARBOX)', content: { data: engineData } },
        { id: 3, heading: 'BRAKES', content: { data: engineData } },
        { id: 4, heading: 'STEERING', content: { data: steeringData } },
        { id: 5, heading: 'POWER TAKE OFF', content: { data: steeringData } },
    ];

    const slickSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 1000,
        slidesToScroll: 1,
        adaptiveHeight: true,
        nextArrow: !isMobile ? <SampleNextArrow /> : null,
        prevArrow: !isMobile ? <SamplePrevArrow /> : null,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }; 

    const handleCompareAll = () => {
        router.push('/compare-tractors');
    };


    const handleDealerLocation = () => {
        router.push('/dealer-locator');
    };

    // const handleCompareTractor = () => {
    //     router.push('/compare-tractors');
    // };

    const handleEnquiry = () => {
        router.push('/contact-us');
    };


    const handleCompareDetailsAll = () => {
        router.push('/compare-tractors');
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 768);
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
            };
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        // debugger;
        const tractorId = Number(slug);
        const selectedTractor = inventoryData.find(tractor => tractor.tractor_id === tractorId);

        if (selectedTractor) {
            // debugger;
            // Extract tractor details
            const tractorDetails = [{
                certified: selectedTractor.is_verified,
                title: `${selectedTractor.brand} ${selectedTractor.model}`,
                district: selectedTractor.district,
                state: selectedTractor.state,
                price: selectedTractor.max_price,
                imageLink: DefaultTractor,
                id: selectedTractor.tractor_id,
                enginePower: selectedTractor.engine_power,
                battery: selectedTractor.is_battery_branded,
                tyreState: selectedTractor.is_tyre_brand_mrf,
                buyingYear: selectedTractor.buying_year,
                finance: selectedTractor.finance,
                engineHours: selectedTractor.engine_hours
            }];



            // Setting dynamic features based on the selected tractor
            const updatedFeatures = features.map((feature) => {
                switch (feature.title) {
                    case 'Battery':
                        return { ...feature, description: tractorDetails[0].battery ? 'Available' : 'Not Available' };
                    case 'Year':
                        return { ...feature, description: tractorDetails[0].buyingYear || 'N/A' };
                    case 'Engine Hours':
                        return { ...feature, description: tractorDetails[0].engineHours || 'N/A' };
                    case 'Engine HP':
                        return { ...feature, description: tractorDetails[0].enginePower || 'N/A' };
                    case 'Tyre Condition':
                        return { ...feature, description: tractorDetails[0].tyreState || 'N/A' };
                    case 'Finance':
                        return { ...feature, description: tractorDetails[0].finance ? 'Available' : 'Not Available' };
                    default:
                        return feature;
                }
            });

            setTractorDetails(tractorDetails);
            setFeatures(updatedFeatures);

        }
    }, [slug, inventoryData]); // ✅ Only runs when `slug` or `inventoryData` changes

    // console.log("TractorDetails" + JSON.stringify(TractorDetails));

    //similarTractors

    let similarTractorsListData = [];

    if (TractorDetails && TractorDetails.length > 0 && inventoryData) {
        // debugger;
        const selectedTractor = TractorDetails[0]; // ✅ Extract first object

        similarTractorsListData = inventoryData
            .filter((item) => item.engine_power === selectedTractor.enginePower && item.tractor_id !== selectedTractor.id)
            .slice(0, 10) // 🚀 Limit results to 10 similar tractors
            .map((item) => ({
                title: `${item.brand} ${item.model}`,
                price: item.max_price,
                engineHours: item.engine_hours,
                driveType: item.drive_type,
                enginePower: item.engine_power,
                tractorId: item.tractor_id,
            }));
    }


    // console.log("Similar Tractors:", JSON.stringify(similarTractorsListData));

    const inventoryList = useMemo(() => {
        // debugger;
        if (!inventoryData || inventoryData.length === 0) {
            return [];
        }
        return inventoryData.slice(0, 50).map((item) => ({
            title: `${item.brand} ${item.model}`,
            price: item.max_price,
            engineHours: item.engine_hours,
            driveType: item.drive_type,
            enginePower: item.engine_power,
            tractorId: item.tractor_id,
        }));
    }, [inventoryData]);

    //compareTractors
    const compareTractorData = useMemo(() =>
        getHomePageTractorsListBasedOnInventory(inventoryList),
        [inventoryList]);
    // Automatically highlight the first available tab from compareTractorData
    useEffect(() => {
        const availableTabs = Object.keys(compareTractorData);
        if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
            setActiveTab(availableTabs[0]); // Set the first available tab
        }
    }, [compareTractorData]); 

    // console.log("compareTractorsData" + JSON.stringify(compareTractorData));  
    const initialState = {
        principal: 0,
        loanAmount: 10000,
        roi: 8, // rate of interest
        tenure: 72,
        downPayment: 100000,
        totalAmtInt: 0
    }; 

    return ( 
        <Layout> 
            {TractorDetails && TractorDetails.length > 0 ? (
                <div className='main-details'> 
                    {/* banner sec */}
                    <Banner breadcrumbs={breadcrumbData}
                        bannerImg={bannerImg}
                        heading={'Tractor Details'} /> 

                    {/* slide sec */}
                    <div className='lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2
             bg-white w-full flex sm:flex-row flex-col gap-4'>

                        <div className='sm:hidden block'>
                            <Heading heading={'Tractor Details'} />
                        </div>

                        {/* slide */}
                        <div className='sm:w-1/2 w-full border'>
                            <InventoryCarousel />
                        </div>
                        <div className='sm:w-1/2 w-full'>
                            <div className=''>
                                <div className='pl-2'>

                                    <div className='mb-2'>UID - TJN185041 | Report Problem</div>
                                    {TractorDetails[0].certified && (<div className='font-bold uppercase sm:text-xl text-lg mb-1'> {TractorDetails[0].title}
                                        <span className="bg-secondaryColor px-2 ml-3 py-1 text-white text-sm uppercase
                                 font-semibold border-gradient">
                                            {TractorDetails[0].certified ? "Certified" : ""}
                                        </span></div>
                                    )}

                                    <span className="bg-primaryColor my-4 inline-block px-2 py-1 text-white w-auto
                                 font-semibold rounded-sm">
                                        Dealer Location
                                    </span>

                                    <div className='mb-3 cursor-pointer flex gap-2 text-secondaryColor
                                 rounded-sm w-full'>
                                        <Image src='/images/tractordetails/editIcon.svg' width={10} height={10}
                                            className='w-3' alt='editIcon' />Change Tractor</div>


                                    <div className='mb-3 cursor-pointer flex gap-2 w-full'>
                                        <Image src='/images/tractordetails/primaymapIcon.svg' width={10} height={10} className='w-3' alt='primaymapIcon' />
                                        {TractorDetails[0].district}, {TractorDetails[0].state}</div>

                                    <div className='font-bold text-xl mb-1'>
                                        {formatPrice(TractorDetails[0].price)}
                                        <span className="line-through text-sm opacity-[30%]"> ₹ 10,84,000 </span></div>

                                    <div className="">EMI starts at <span className="text-secondaryColor"> ₹ 3,657/month</span> </div>

                                    <div className='sm:flex gap-4'>
                                        <div className='sm:w-1/2 w-full my-4'>
                                            <Btn text={"Enquiry"} bgColor={true} onClick={handleEnquiry} />
                                        </div>
                                        <div className='sm:w-1/2 w-full my-4'>
                                             <div className="block bg-primaryColor text-white rounded-[4px] opacity-1 cursor-pointer px-4 py-2 text-center border-primaryColor font-semibold border-[1px] ">
                                             <Link
                                                href={{
                                                    pathname: '/compare-tractors',
                                                    query: {
                                                        id: Id
                                                    }
                                                }}
                                                passHref
                                            >
                                                 <a>Compare Tractors</a>
                                            </Link>
                                           
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                    </div>

                    {/* Features sec */}
                    <div className='bg-[#F3F3F4]'>
                        <div className='lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2'> 
                            <Heading heading={TractorDetails[0].title} />
                            <div className='py-3 sm:mt-5 mt-1 grid md:grid-cols-6 sm:grid-cols-3 
                    grid-cols-2 sm:gap-4 gap-8'>
                                {features.map((feature, index) => (
                                    <div key={index} className='features-shadow text-sm bg-white pb-1 pt-6 px-2 rounded-md text-center relative'>
                                        <div className='absolute top-[-30px] left-1/2 transform -translate-x-1/2'>
                                            <Image src={feature.src}
                                                alt={feature.alt}
                                                width={60}
                                                height={60}
                                                className='tractorsFeatures' />
                                        </div>
                                        <p className='font-bold uppercase mt-5'>{feature.title}</p>
                                        <span>{feature.description}</span>
                                    </div>
                                ))}
                            </div>
                            {/* <div className='sm:w-1/4 w-full m-auto mt-2'>
                        <Btn text={'View Latest Offers'} bgColor={true} />
                    </div> */}
                        </div>
                    </div>


                    {/* emi sec */}

                    <div className='bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2'>

                        <Heading heading={'Calculate ' + TractorDetails[0].title} />
                        <div className='bg-[#F6F6F6] px-3 py-6 mt-3 flex sm:flex-row flex-col gap-4'> 
                            <div className='sm:w-1/2 w-full'> 
                                <LeftSection state={TractorDetails} dispatch={dispatch} maxPrice={formatPrice(TractorDetails[0].price)} />  
                                {/* <div className='mt-4'>
                                    <Btn bgColor={true} text={'Calculate Loan'} />
                                </div>  */}
                            </div> 
                            <div className='sm:w-1/2 w-full'>  
                                <RightSection state={TractorDetails} /> 
                            </div>
                        </div>
                    </div> 
                    {/* why choose us */}
                    <div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:py-4 py-2 relative bg-white mt-3">
                        <Heading heading={t('Home.Why_Choose_Us')} viewButton={false} />
                        <div className="flex md:flex-row flex-col justify-between md:gap-16 gap-4 mt-4">
                            <div className="md:w-[40%]">
                                <div className='font-bold text-lg'>
                                    {t('Home.Over_Deals')}<br />
                                    {t('Home.Best_Choice')}</div>
                                <p className='mt-2 text-[.9rem]'>
                                    {/* {t('Home.Kiusmod_Tempor')} */}
                                </p>
                            </div>
                            <div className='absolute sm:top-[-85px] right-0 bottom-[-80px]'>
                                <Image src={WhyChoose} alt='WhyChoose' width={400} height={400}
                                    className='whychooseImg' />
                            </div>
                        </div>
                        <div className='sm:mt-10 mt-2'>
                            <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-2 w-full relative
                     z-10 sm:pb-0 pb-16">
                                {WhyChooseItems.map((item, index) => (
                                    <div key={index}>
                                        <div className="bg-white overflow-hidden flex justify-center 
                                shadow-custom-medium px-4 sm:pb-9 py-2 flex-col items-center">
                                            <div>
                                                <Image src={item.src} alt={item.alt} className="chooseImg" />
                                            </div>
                                            <p className="text-center font-bold xl:text-xl lg:text-lg 
                                    md:text-base sm:text-base text-[0.85rem]">
                                                {item.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Similar Tractors */}
                    <div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2 bg-white ">
                        <Heading heading={'Similar Tractors'} viewButton={true} className='mt-8' />

                        <div className="SimilarTractors relative" id="similarTractorsSlide">
                            <LiveInventoryContainer locale={locale} data={similarTractorsListData} />
                            <Btn text={t('Home.View_All')} viewAll={true} />
                        </div>
                    </div>


                    {/* Compare To Buy The Right Tractor sec */}
                    <div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:py-4 py-2 bg-white mt-3">
                        <div className="font-bold xl:text-xl lg:text-lg md:text-base text-xl">
                            <p className="mb-[-5px]">Compare To Buy The Right Tractor</p>
                        </div>

                        <div className='flex sm:gap-4 gap-2 my-3 font-medium relative z-20'>
                            {HomeHPRanges.map((range) => (
                                <Tab
                                    key={range.key}
                                    id={range.key}
                                    activeTab={activeTab}
                                    onClick={handleTabClick}
                                >
                                    {getTabLabel(range.min, range.max)}
                                </Tab>
                            ))}
                        </div>

                        <div className="">
                            <div className='grid sm:grid-cols-3 md:gap-6 gap-4'>
                                {Object.keys(compareTractorData).map((key) =>
                                    activeTab === key ? (
                                        <>
                                            {compareTractorData[activeTab]?.slice(0, 3).map((item, index) => (
                                                <div key={index} className='overflow-hidden flex-none'>
                                                    <Image src={CompareImage} alt='compareImage' layout='responsive' />
                                                    <div className='flex justify-between px-3 mb-3'>
                                                        <div>
                                                            <div>{item.brand1}</div>
                                                            <div className='font-semibold my-1'><Image src={HP} width={15} height={15} /> {item.brand1hp}</div>
                                                            <div className='font-semibold my-1'>
                                                                {formatPrice(item.brand1price)}
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <div>{item.brand2}</div>
                                                            <div className='font-semibold my-1'><Image src={HP} width={15} height={15} /> {item.brand2hp}</div>
                                                            <div className='font-semibold my-1'> {formatPrice(item.brand2price)}</div>
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={{
                                                            pathname: '/compare-tractors/compare-tractor-details',
                                                            query: {
                                                                t1: item.brand1,
                                                                t2: item.brand2,
                                                                id1: item.brand1Id,
                                                                id2: item.brand2Id
                                                            }
                                                        }}
                                                        passHref
                                                    >
                                                        <Btn className="uppercase" text={t('Home.COMPARE')} />
                                                    </Link>
                                                </div>
                                            ))}

                                        </>
                                    ) : null
                                )}

                            </div>
                        </div>

                    </div>

                    <div className='justify-center flex my-4'>
                        <Btn text={t('Home.View_All_Tractor_Comparison')} onClick={handleCompareDetailsAll} bgColor={true}
                        />
                    </div>

                </div>
            ) : null}
        </Layout>

    )
}

