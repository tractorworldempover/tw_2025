import React, { useState, useRef, useEffect, useMemo } from 'react'
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Image from "next/image";
import Heading from "@components/Heading";
import Tab from '@components/Tab';
import CompareImage from '@Images/liveInventory/compareImage.svg';
import CompareImage2 from '@Images/compareTractorImg/mahindra.svg';
import Btn from '@components/Btn';
import HP from '@Images/hp.svg';
import BannerImg from '@Images/compareTractorImg/Compare_tractor_banner.svg';
import CompareImg from '@Images/compareTractorImg/compareImg.svg';
import vs from '@Images/compareTractorImg/vs.svg';
import Search from '@Images/compareTractorImg/search.svg';
import leftArrow from '@Images/compareTractorImg/leftArrow.svg';
import Modal from "@components/Modal";
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";
import { getLocaleProps } from "@helpers";
import { getTractorDetailsById, getTabLabel, HomeHPRanges, formatPrice, getHomePageTractorsListBasedOnInventory } from '@utils';
import Link from 'next/link';

export async function getStaticProps(context) {
    return await getLocaleProps(context);
}

export default function CompareTractor({ locale, inventoryData }) { 

    const router = useRouter();
    const language = locale?.toUpperCase();

    const [showBrandsModal, setShowBrandsModal] = useState(false);
    const [showBrandsModelsModal, setShowBrandsModelsModal] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [brandsSearchQuery, setBrandsSearchQuery] = useState('');
    const [modelsSearchQuery, setModelsSearchQuery] = useState('');


    const brandsModalShow = () => setShowBrandsModal(true);
    const [isMobile, setIsMobile] = useState(false);
    const [brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [SelectedModelId, setSelectedModelId] = useState('');
    const [selectedTractorDetails, setSelectedTractorDetails] = useState([]);
    const { t, i18n } = useTranslation('common');

    const handleClose = () => {
        setShowBrandsModal(false);
        setShowBrandsModelsModal(false);
        //setModelsSearchQuery('');
        setBrandsSearchQuery('');
        setSelectedBrand('');
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
        if (Array.isArray(inventoryData) && inventoryData.length > 0) {
            console.log("Raw inventory data:", JSON.stringify(inventoryData));

            const brandMap = new Map();
            const modelMap = new Map();

            inventoryData.forEach(item => {
                // Store unique brands with their first tractor_id
                if (item.brand && item.tractor_id) {
                    if (!brandMap.has(item.brand)) {
                        brandMap.set(item.brand, { brandName: item.brand, id: item.tractor_id });
                    }
                }

                // Store unique models per brand
                if (item.brand && item.model && item.tractor_id) {
                    const key = `${item.brand}-${item.model}`;  // Unique key for brand-model combination
                    if (!modelMap.has(key)) {
                        modelMap.set(key, {
                            modelName: item.model,
                            id: item.tractor_id,
                            brandName: item.brand  // Attach brand to filter later
                        });
                    }
                }
            });

            setBrands(Array.from(brandMap.values()));
            setFilteredBrands(Array.from(brandMap.values())); // Initially same as brands
            setModels(Array.from(modelMap.values()));
            setFilteredModels(Array.from(modelMap.values())); // Initially same as models
        }
    }, [inventoryData]);


    useEffect(() => {
        if (brandsSearchQuery.trim() === "") {
            setFilteredBrands(brands); // Reset brands when search is empty
        } else {
            const filtered = brands.filter(brand =>
                brand.brandName.toLowerCase().includes(brandsSearchQuery.toLowerCase())
            );
            setFilteredBrands(filtered);
        }
    }, [brandsSearchQuery, brands]);

    useEffect(() => {
        if (modelsSearchQuery.trim() === "") {
            setFilteredModels(models); // Reset models when search is empty
        } else {
            const filtered = models.filter(model =>
                model.modelName.toLowerCase().includes(modelsSearchQuery.toLowerCase())
            );
            setFilteredModels(filtered);
        }
    }, [modelsSearchQuery, models]);


    const handleBrandRadioChange = (event) => {
        const selected = event.target.value;
        setSelectedBrand(selected);

        // Get all models of the selected brand
        const modelsForBrand = inventoryData
            .filter(item => item.brand === selected)
            .map(item => ({ modelName: item.model, id: item.tractor_id }));

        setModels(modelsForBrand);
        setFilteredModels(modelsForBrand); // Reset filtered models


        setShowBrandsModal(false);
        setShowBrandsModelsModal(true);
    };

    useEffect(() => {
        if (modelsSearchQuery.trim() === "") {
            setFilteredModels(models); // Reset models when search is empty
        } else {
            const filtered = models.filter(model =>
                model.modelName.toLowerCase().includes(modelsSearchQuery.toLowerCase())
            );
            setFilteredModels(filtered);
        }
    }, [modelsSearchQuery, models]);


    const handleModelRadioChange = (event) => {
        // debugger;
        const selectedModelName = event.target.value;
        const modelObj = models.find(model => model.modelName === selectedModelName);

        setSelectedModel(selectedModelName);
        setSelectedModelId(modelObj ? modelObj.id : null);

        console.log("Selected Model:", selectedModelName);
        console.log("Selected Model ID:", modelObj ? modelObj.id : "Not found");

        if (modelObj?.id) {
            const tractorDetails = getTractorDetailsById(inventoryData, modelObj.id);
            console.log("Full Tractor Details:", tractorDetails);
            setShowBrandsModelsModal(false);

            if (tractorDetails) {
                setSelectedTractorDetails((prevDetails) => {
                    // If already 3 tractors are selected, replace the oldest one
                    const updatedDetails = [...prevDetails, tractorDetails].slice(-3);
                    return updatedDetails;
                });
            }

        }

    };


    const handleModelsBack = () => {
        setShowBrandsModelsModal(false);
        setShowBrandsModal(true); 
    };

    const breadcrumbData = [
        { label: t('Home.Home'), link: '/' },
        { label: t('Compare.Compare_Tractore'), link: '#' },
    ];

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: !isMobile ? '40%' : '90%'
        },
    };

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

    const compareTractorData = useMemo(() =>
        getHomePageTractorsListBasedOnInventory(inventoryList),
        [inventoryList]);

    const [activeTab, setActiveTab] = useState("oneData");

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleNavigation = (path) => {
        router.push(path);
    };

    const handleCompareAll = () => handleNavigation('/compare-tractors');




    return (
        <div>
            <Layout currentPage={"compare"}>
                <Banner
                    breadcrumbs={breadcrumbData}
                    heading={t('Compare.Compare_Tractore')}
                    bannerImg={BannerImg}
                />

                <div className="bg-white mb-3 lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
                    <Heading heading={t('Compare.Compare_Tractore')} />

                    <div className='flex sm:items-start items-center gap-4 justify-between'>
                        {Array.from({ length: 2 }).map((_, index) => {
                            const tractor = selectedTractorDetails[index]; // Check if tractor exists

                            return (
                                <React.Fragment key={index}>
                                    {/* Tractor Image */}
                                    <div className='text-center cursor-pointer'>
                                        <Image
                                            src={tractor ? CompareImage2 : CompareImg} 
                                            alt='compareImg'
                                            width={350}
                                            height={350}
                                            onClick={brandsModalShow}
                                        />
                                    </div>

                                    {/* VS Image (skip after the last tractor) */}
                                    {index < 1 && (
                                        <div className='my-auto sm:w-[35px] h-auto w-[50px]'>
                                            <Image src={vs} alt='vs' layout='responsive' />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Dynamic Compare Button */}
                    <div className='mt-4 w-full flex justify-end'>
                        <div className='sm:w-[15%] w-full'>
                            <Link
                                href={{
                                    pathname: '/compare-tractors/compare-tractor-details',
                                    query: {
                                        t1: selectedTractorDetails[0]?.brand || "Unknown",
                                        t2: selectedTractorDetails[1]?.brand || "Unknown",
                                        // t3: selectedTractorDetails[2]?.brand || "Unknown",
                                        id1: selectedTractorDetails[0]?.tractor_id || "0",
                                        id2: selectedTractorDetails[1]?.tractor_id || "0",
                                        // id3: selectedTractorDetails[2]?.tractor_id || "0"
                                    }
                                }}
                            >
                                <a>
                                    <Btn text={t('Home.COMPARE')} bgColor={true} disabled={!selectedTractorDetails} />
                                </a>
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="bg-white mb-3 lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
                    <Heading heading={t('Home.Buy_The_Right')} />
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

                    <div className='justify-center flex mt-2'>
                        <Btn text={t('Home.View_All_Tractor_Comparison')} onClick={handleCompareAll} bgColor={true}
                        />
                    </div>


                </div>

                <Modal showModal={showBrandsModal} customStyles={customStyles} handleClose={handleClose} content={
                    <div className='flex sm:flex-row flex-col-reverse w-full'>
                        <div className='px-4 py-4 w-full'>
                            <div className="flex items-center gap-2 opacity-50">
                                <Image src={leftArrow} alt='leftArrow' width={15} height={15} className='cursor-pointer' onClick={handleClose} />
                                <p className='font-bold text-2xl'>{t('Compare.Select_Brand')}</p>
                            </div>

                            <div className="relative w-full mt-4">
                                <input type="text" placeholder={t('Compare.Search_PlaceHolder')} className="w-full rounded border-[1px] border-[#D0D0D0] py-2 pr-14"
                                    value={brandsSearchQuery}
                                    onChange={(e) => setBrandsSearchQuery(e.target.value)}
                                />
                                <div className="absolute top-[58%] transform -translate-y-1/2 right-2">
                                    <Image src={Search} alt="search" width={40} height={40} />
                                </div>
                            </div>


                            {filteredBrands.length === 0 ? (
                                <p className='mt-2 text-center text-primaryColor'>{t('Compare.No_Data')}</p>
                            ) : (
                                <div className="p-2 mt-4 flex flex-col w-full gap-2 h-80 brands-container overflow-y-auto">
                                    {filteredBrands.map((option, index) => (
                                        <div key={option.brandName}>
                                            <input type="radio" name="brands" className='brands' checked={option.brandName == selectedBrand} value={option.brandName}
                                                onChange={handleBrandRadioChange}
                                            />
                                            <label className="ml-2">{option.brandName}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                } />

                <Modal showModal={showBrandsModelsModal} customStyles={customStyles} handleClose={handleClose} content={
                    <div className='flex sm:flex-row flex-col-reverse w-full'>
                        <div className='px-4 py-4 w-full'>
                            <div className="flex items-center gap-2 opacity-50">
                                <Image src={leftArrow} alt='leftArrow' width={15} height={15} className='cursor-pointer' onClick={handleModelsBack} />
                                <p className='font-bold text-2xl'>Select Models</p>
                            </div>

                            <div className="relative w-full mt-4">
                                <input type="text" placeholder="Search Tractor Brand Model" className="w-full rounded border-[1px] border-[#D0D0D0] py-2 pr-14"
                                    value={modelsSearchQuery}
                                    onChange={(e) => setModelsSearchQuery(e.target.value)}
                                />
                                <div className="absolute top-[58%] transform -translate-y-1/2 right-2">
                                    <Image src={Search} alt="search" width={40} height={40} />
                                </div>
                            </div>

                            {filteredModels.length === 0 ? (
                                <p className='mt-2 text-center text-primaryColor'>No search data available</p>
                            ) : (

                                <div className="p-2 mt-4 flex flex-col w-full gap-2 h-80 brands-container overflow-y-auto">
                                    {filteredModels.map((option, index) => (
                                        <div key={`${option.modelName}-${index}`}>
                                            <input type="radio" name="models" className='models' value={option.modelName}
                                                onChange={handleModelRadioChange}
                                            />
                                            <label className="ml-2">{option.modelName}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                } />

            </Layout>
        </div>
    );
} 