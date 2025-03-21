import React, { useState, useRef, useEffect } from 'react'
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Image from "next/image";
import Heading from "@components/Heading";
import Tab from '@components/Tab';
import CompareImage from '@Images/liveInventory/compareImage.svg';
import Btn from '@components/Btn';
import HP from '@Images/hp.svg';
import BannerImg from '@Images/compareTractorImg/Compare_tractor_banner.svg';
import CompareImg from '@Images/compareTractorImg/compareImg.svg';
import vs from '@Images/compareTractorImg/vs.svg';
import Search from '@Images/compareTractorImg/search.svg';
import leftArrow from '@Images/compareTractorImg/leftArrow.svg';
import Modal from "@components/Modal";
import { GET_ALL_BRANDS, GET_ALL_MODELS_BY_BRAND } from "@utils/constants";
import { useQuery } from '@apollo/client';
import Loader from '@components/Loader';
import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";
import { getLocaleProps } from "@helpers";
import LoaderHi from '@Images/loader.gif';
import LoaderMr from '@Images/loaderMr.gif';
import LoaderEn from '@Images/loaderEn.gif';

export async function getServerSideProps(context) {
    return await getLocaleProps(context);
}

export default function CompareTractor({ locale }) {
    const router = useRouter();
    const language = locale?.toUpperCase(); 

    const [showBrandsModal, setShowBrandsModal] = useState(false);
    const [showBrandsModelsModal, setShowBrandsModelsModal] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const brandsModalShow = () => setShowBrandsModal(true);
    const [isMobile, setIsMobile] = useState(false);
    const [brandsSearchQuery, setBrandsSearchQuery] = useState('');
    const [modelsSearchQuery, setModelsSearchQuery] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const { t, i18n } = useTranslation('common');

    const handleClose = () => {
        setShowBrandsModal(false);
        setShowBrandsModelsModal(false);
        setModelsSearchQuery('');
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

    ////get brands api intigration
    const { data: brandsData, loading: brandsLoading, error: brandsError } = useQuery(GET_ALL_BRANDS);

    useEffect(() => {
        if (brandsData) {
            const brandOptions = brandsData.brandsmodels.edges.map(({ node }) => {
                return {
                    brandName: node.brandmodelFields.brand
                };
            });
            // console.log(JSON.stringify(brandOptions) + "brandOptions");
            setBrands(brandOptions);
        }
    }, [brandsData]);
    ////end brands api intigration 

    // Filter brands based on search query
    useEffect(() => {
        if (brandsData) {
            const filteredBrands = brandsData.brandsmodels.edges
                .filter(({ node }) =>
                    node.brandmodelFields.brand.toLowerCase().includes(brandsSearchQuery.toLowerCase())
                )
                .map(({ node }) => ({
                    brandName: node.brandmodelFields.brand
                }));

            setBrands(filteredBrands);
            setNoResults(filteredBrands.length === 0);

        }
    }, [brandsSearchQuery, brandsData]);
    //edn Filter brands based on search query


    ////get models by brands api intigration
    const { data: modelsBybrandsData, loading: modelsBybrandsLoading, error: modelsBybrandsError } = useQuery(GET_ALL_MODELS_BY_BRAND, {
        variables: { brand: selectedBrand },
    });

    useEffect(() => {
        // debugger;
        if (modelsBybrandsData) {
            const modelsOptions = modelsBybrandsData.brandsmodels.edges.map(({ node }) => {
                const modelSplitName = node.brandmodelFields.models.split(',');
                return {
                    modelName: modelSplitName
                };
            });

            // const data = JSON.parse(modelsOptions);
            const modelNames = modelsOptions[0].modelName.map(name => ({ modelName: name.trim() }));
            setModels(modelNames);
            // console.log(JSON.stringify(models) + "models"); 
        }
    }, [modelsBybrandsData]);
    ////end get models by brands api intigration

    // Filter models based on search query
    useEffect(() => {
        if (modelsBybrandsData) {
            const filteredModels = modelsBybrandsData.brandsmodels.edges
                .filter(({ node }) =>
                    node.brandmodelFields.models.toLowerCase().includes(modelsSearchQuery.toLowerCase())
                )
                .map(({ node }, index) => {
                    const modelNames = node.brandmodelFields.models.split(',')
                        .map(name => name.trim())
                        .filter(name => name.toLowerCase().includes(modelsSearchQuery.toLowerCase()));
                    return modelNames.map(name => ({
                        key: `${index}-${name}`,
                        modelName: name
                    }));
                })
                .flat();

            setModels(filteredModels);
            setNoResults(filteredModels.length === 0);
            // console.log(filteredModels);
        }
    }, [modelsSearchQuery, modelsBybrandsData]);

    const handleBrandRadioChange = (event) => {
        setSelectedBrand(event.target.value);
        setShowBrandsModal(false);
        setShowBrandsModelsModal(true);
        //console.log(selectedBrand + "firstradioBtn");
    };

    const handleModelsBack = () => {
     //   console.log(selectedBrand + "closeradioButon");
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

    const compareTractorData = {

        oneData: [

            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
        ],

        twoData: [

            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
        ],

        ThreeData: [

            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
        ],

        FourData: [

            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
        ],

        FifthData: [

            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
        ],

        SixthData: [

            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },
            {
                brand1: 'Mahindra 475 DI',
                brand2: 'Kubota MU401 2WD',
                brand1hp: '42 HP',
                brand2hp: '42 HP',
                brand1price: '₹ 6.45-6.75 Lakh*',
                brand2price: '₹ 8.30-8.40 Lakh*'
            },

        ]
    };

    const [activeTab, setActiveTab] = useState("oneData");
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    if (brandsLoading || modelsBybrandsLoading) return (
        <Loader loaderImage={language == 'HI' ? LoaderHi : language == 'MR' ? LoaderMr : LoaderEn} />
    );

    if (brandsError || modelsBybrandsError) return <p>Error: {brandsError?.message} || Error: {modelsBybrandsError?.message}</p>;

    const handleCompareTractordetails = () => {
        router.push('/compare-tractors/compare-tractor-details');
    };
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

                        <div className='text-center cursor-pointer' onClick={brandsModalShow}>
                            <Image src={CompareImg} alt='compareImg' width={250} height={250} />
                        </div>

                        <div className='my-auto sm:w-[35px] h-auto w-[50px]'>
                            <Image src={vs} alt='vs' layout='responsive' />
                        </div>

                        <div className='text-center cursor-pointer'>
                            <Image src={CompareImg} alt='compareImg' width={250} height={250} />
                        </div>

                        <div className='my-auto sm:w-[35px] h-auto w-[50px]'>
                            <Image src={vs} alt='vs' layout='responsive' />
                        </div>

                        <div className='text-center cursor-pointer'>
                            <Image src={CompareImg} alt='compareImg' width={250} height={250} />
                        </div>

                    </div>

                    <div className='mt-4 w-full flex justify-end'>
                        <div className='sm:w-[15%] w-full'>
                            <Btn text={t('Home.COMPARE')} bgColor={true} disabled={true} />
                        </div>
                    </div>

                </div>

                <div className="bg-white mb-3 lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
                    <Heading heading={t('Home.Buy_The_Right')} />

                    <div className='flex sm:gap-4 gap-2 my-3 font-medium'>
                        <Tab id="oneData" activeTab={activeTab} onClick={handleTabClick}>
                            Under 20 HP</Tab>
                        <Tab id="twoData" activeTab={activeTab} onClick={handleTabClick}>21 - 30 HP</Tab>
                        <Tab id="ThreeData" activeTab={activeTab} onClick={handleTabClick}>31 - 40 HP</Tab>
                        <Tab id="FourData" activeTab={activeTab} onClick={handleTabClick}>41 - 45 HP</Tab>
                        <Tab id="FifthData" activeTab={activeTab} onClick={handleTabClick}>46 - 50 HP</Tab>
                        <Tab id="SixthData" activeTab={activeTab} onClick={handleTabClick}>Above 50 HP</Tab>
                    </div>

                    <div className="">
                        <div className='grid sm:grid-cols-3 grid-cols-1 xl:gap-8 gap-4'>
                            {Object.keys(compareTractorData).map((key) =>
                                activeTab === key ? (
                                    <>
                                        {compareTractorData[key].map((item, index) => (
                                            <div key={index} className=' shadow p-2 overflow-hidden flex-none'>
                                                <Image src={CompareImage} alt='compareImage' layout='responsive' />
                                                <div className='flex justify-between px-3 mb-3'>
                                                    <div>
                                                        <div>{item.brand1}</div>
                                                        <div className='font-semibold my-1'><Image src={HP} width={15} height={15} /> {item.brand1hp}</div>
                                                        <div className='font-semibold my-1'>{item.brand1price}</div>

                                                    </div>
                                                    <div>
                                                        <div>{item.brand2}</div>
                                                        <div className='font-semibold my-1'><Image src={HP} width={15} height={15} /> {item.brand2hp}</div>
                                                        <div className='font-semibold my-1'>{item.brand2price}</div>

                                                    </div>
                                                </div>
                                                <Btn className="uppercase" text={t('Home.COMPARE')} onClick={handleCompareTractordetails} />
                                            </div>
                                        ))}

                                    </>
                                ) : null
                            )}
                        </div>

                        <div className='flex justify-center my-6'>
                            <Btn text={t('Home.View_All_Tractor_Comparison')} bgColor={true} onClick={handleCompareTractordetails} />
                        </div>
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


                            {noResults ? (
                                <p className='mt-2 text-center text-primaryColor'>{t('Compare.No_Data')}</p>
                            ) : (
                                <div className="p-2 mt-4 flex flex-col w-full gap-2 h-80 brands-container overflow-y-auto">
                                    {brands.map((option, index) => (
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
                                <input type="text" placeholder="Search Tractor Brand by Name" className="w-full rounded border-[1px] border-[#D0D0D0] py-2 pr-14"
                                    value={modelsSearchQuery}
                                    onChange={(e) => setModelsSearchQuery(e.target.value)}
                                />
                                <div className="absolute top-[58%] transform -translate-y-1/2 right-2">
                                    <Image src={Search} alt="search" width={40} height={40} />
                                </div>
                            </div>

                            {noResults ? (
                                <p className='mt-2 text-center text-primaryColor'>No search data available</p>
                            ) : (

                                <div className="p-2 mt-4 flex flex-col w-full gap-2 h-80 brands-container overflow-y-auto">
                                    {models.map((option, index) => (
                                        <div key={option.modelName}>
                                            <input type="radio" name="models" className='models' value={option.modelName}
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
