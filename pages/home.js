import React, { useEffect, useState,useMemo} from 'react';
import { useRouter } from 'next/router'  ;
import Image from 'next/image';
import languagePopupImg from '@Images/languagePopup.svg';
import Heading from "@components/Heading"   ;
import BuyTractors from '@Images/home/buytractors.svg';
import BuyTractorsHi from '@Images/home/buytractorsHi.svg';
import BuyTractorsMr from '@Images/home/buytractorsMr.svg';
import SellTractors from '@Images/home/SellTractors.svg';
import SellTractorsHi from '@Images/home/SellTractorsHi.svg';
import SellTractorsMr from '@Images/home/SellTractorsMr.svg';
import Loan from '@Images/home/Loan.svg';
import LoanHi from '@Images/home/LoanHi.svg';
import LoanMr from '@Images/home/LoanMr.svg';
import HP from '@Images/hp.svg';
import LocateDealer from '@Images/home/locateDealer.svg';
import LocateDealerHi from '@Images/home/locateDealerHi.svg';
import LocateDealerMr from '@Images/home/locateDealerMr.svg';
import ContentHub from '@Images/home/ContentHub.svg';
import ContentHubHi from '@Images/home/ContentHubHi.svg';
import ContentHubMr from '@Images/home/ContentHubMr.svg';
import Compare from '@Images/home/compare.svg';
import CompareHi from '@Images/home/compareHi.svg';
import CompareMr from '@Images/home/compareMr.svg';
import WhyChoose from '@Images/home/whyChoose.svg';
import { ReadMore } from '@components/ReadMore';
import LiveInventoryContainer from '@components/LiveInventory';
import Warranty from '@Images/home/warranty.svg';
import EasyEMI from '@Images/home/easyEMI.svg';
import Documenting from '@Images/home/documenting.svg';
import Finance from '@Images/home/finance.svg';
import Call from '@Images/home/call.svg';
import Share from '@Images/home/share.svg';
import Thumb from '@Images/home/thumb.svg';
import Tractor from '@Images/home/tractor.svg';
import homeIcon from '@Images/footer/homeIcon.svg'
import callIcon from '@Images/footer/callIcon.svg'
import enquiryIcon from '@Images/footer/enquiryIcon.svg'
import shareIcon from '@Images/footer/shareIcon.svg';
import LoaderHi from '@Images/loader.gif';
import LoaderMr from '@Images/loaderMr.gif';
import LoaderEn from '@Images/loaderEn.gif';
import Btn from '@components/Btn';
import Tab from '@components/Tab';
import CompareImage from '@Images/liveInventory/compareImage.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MultipleItemsSlide from "@components/SingleItemsSlide";
import Link from 'next/link';
import { useQuery } from "@apollo/client";
import { HOMEPAGE_QUERIES, LiveInventoryAPIURL } from "@utils/constants";
import Loader from '@components/Loader';
import Modal from "@components/Modal";
import Crossmark from '@Images/inventory/closeIcon.svg';
import { useTranslation } from 'next-i18next';
import { HomeHPRanges, getTabLabel, getHomePageTractorsListBasedOnInventory,formatPrice } from '@utils';
 
export default function HomePage({ locale, Inventorydata }) {

    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('oneData');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showCallRequestModal, setShowCallRequestModal] = useState(false);
    const router = useRouter();
    const language = "EN";
    const { t, i18n } = useTranslation('common');


    const isShowCallModal = () => {
        setShowModal(true);
    }

    const handleRequestCall = () => {
        setShowCallRequestModal(true);
        setShowModal(false);
    }

    const handleClose = () => {
        setShowModal(false);
        setShowCallRequestModal(false);
    }


    useEffect(() => {
        //moble web devide
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
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY) {
                    // Scrolling down
                    setIsVisible(false);
                } else {
                    // Scrolling up
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [lastScrollY]);


    const { data, loading, error, networkStatus } = useQuery(HOMEPAGE_QUERIES, {
        variables: { lang: language },
        fetchPolicy: 'cache-first'
    });




    // Combined loading and error handling
    // if (loading) return (
    //     <Loader loaderImage={language == 'HI' ? LoaderHi : language == 'MR' ? LoaderMr : LoaderEn} />
    // );

    if (error) return <p>Error: {error.message}</p>;

    const bannersData = data?.homeSliders?.nodes || [];
    const testimonialsData = data?.testimonials?.nodes || [];
    const contentGalleryData = data?.contentgallerys?.nodes || [];
    const latestNewsData = data?.latestnews?.edges?.map(edge => edge.node) || [];


    const homeBannerSlides = bannersData.map(node => {
        const desktopUrl = node.homesliders.sliderimage.node.mediaItemUrl;
        const mobileUrl = node.homesliders.mobilesliderimage.node.mediaItemUrl;
        return { desktopUrl, mobileUrl };
    });


    const testimonialSlides = testimonialsData.map(node => {
        const testimonialMobileUrl = node.tesimonails.mobileimage.node.mediaItemUrl;
        const testimonialDesktopUrl = node.tesimonails.webimage.node.mediaItemUrl;
        const testimonialDescription = node.tesimonails.description;
        const testimonialVideoUrl = node.tesimonails.videourl;
        return {
            testimonialDesktopUrl,
            testimonialMobileUrl,
            testimonialDescription,
            testimonialVideoUrl
        };
    });

    const contentGalley = contentGalleryData.map(node => {
        const contentGalleyUrl = node.contentGalleryFields.image.node.mediaItemUrl;
        const contentGalleyDate = node.date;
        const contentGalleyBadge = node.contentGalleryFields.badge;
        const contentGalleyTitle = node.title;
        const contentGalleyURL = node.uri;
        return {
            contentGalleyUrl,
            contentGalleyDate,
            contentGalleyBadge,
            contentGalleyTitle,
            contentGalleyURL
        };
    });

    const latestNewsGalley = latestNewsData.map(node => {
        const contentGalleyUrl = node.contentGalleryFields.image.node.mediaItemUrl;
        const contentGalleyDate = node.date;
        const contentGalleyBadge = node.contentGalleryFields.badge;
        const contentGalleyDescription = node.contentGalleryFields.description;

        const contentGalleyTitle = node.title;
        const contentGalleyURL = node.uri;
        return {
            contentGalleyUrl,
            contentGalleyDate,
            contentGalleyBadge,
            contentGalleyDescription,
            contentGalleyTitle,
            contentGalleyURL
        };
    });

    // debugger;

    const inventoryList = useMemo(() => {
        if (!Inventorydata || Inventorydata.length === 0) {
            return [];
        }

        return Inventorydata.slice(0, 50).map((item) => ({
            title: `${item.brand} ${item.model}`,
            price: item.max_price,
            engineHours: item.engine_hours,
            driveType: item.drive_type,
            enginePower: item.engine_power,
            tractorId: item.tractor_id,
        }));
    }, [Inventorydata]);  


    const handleNavigation = (path) => {
         router.push(path);
    };

    // .then(() => setIsShowLoader(false));

    const handleCompareAll = () => handleNavigation('/compare-tractors');
    const handleAllExclusiveOffers = () => handleNavigation('/exclusive-offers');
    const handleAllLiveInventory = () => handleNavigation('/inventory');
    const handleAllContentHub = () => handleNavigation('/content-hub');
    const handleContentGallery = () => handleNavigation('/content-gallery');


    const handleShareClick = () => {
        const MessageText = language === 'HI'
            ? 'ट्रैक्टर वर्ल्ड देखें!'
            : language === 'MR'
                ? 'ट्रॅक्टर वर्ल्ड पहा!'
                : 'Check out Tractor World!';
        const message = encodeURIComponent(MessageText + " https://tractor-world-2024.vercel.app/");
        const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;
        window.open(whatsappURL, '_blank');
    };

    const WhyChooseItems = [
        { src: Warranty, alt: "choose1", label: t('Home.Warranty') },
        { src: EasyEMI, alt: "EasyEMI", label: t('Home.Easy_EMI') },
        { src: Documenting, alt: "Documenting", label: t('Home.Documenting') },
        { src: Finance, alt: "Finance", label: t('Home.Mahendra_Financing') }
    ];

    const exploreimages = [
        {
            image: language == 'HI' ? BuyTractorsHi : language == 'MR' ? BuyTractorsMr : BuyTractors,
            url: '/inventory'
        },
        {
            image: language == 'HI' ? SellTractorsHi : language == 'MR' ? SellTractorsMr : SellTractors,
            url: '/sell-tractor'
        },
        {
            image: language == 'HI' ? CompareHi : language == 'MR' ? CompareMr : Compare,
            url: '/compare-tractors'
        },
        {
            image: language == 'HI' ? LocateDealerHi : language == 'MR' ? LocateDealerMr : LocateDealer,
            url: '/dealer-locator'
        },
        {
            image: language == 'HI' ? LoanHi : language == 'MR' ? LoanMr : Loan,
            url: '/loan'
        },
        {
            image: language == 'HI' ? ContentHubHi : language == 'MR' ? ContentHubMr : ContentHub,
            url: '/content-hub'
        },
    ];

    const handleTabClick = (tabid) => {
        // debugger;
        setActiveTab(tabid); // Dynamically set the active tab based on clicked tab's id
    };


    const contentGallerysettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    const bannerGalleryitems = homeBannerSlides.map((src, index) => (
        <div key={index} className="relative sm:w-[1921] sm:h-[629] w-[750] h-[387] overflow-hidden">
            <Image width={isMobile ? 750 : 1921} height={isMobile ? 387 : 629}
                className="w-full h-full" src={isMobile ? src.mobileUrl : src.desktopUrl} layout="responsive" alt={`Banner${index + 1}`} />
        </div>
    ));

    const testimonialsGalleryItems = testimonialSlides.map((image, index) => (
        <div key={index} className="relative">
            <div className=''>
                <Image
                    width={isMobile ? 799 : 1920}
                    height={isMobile ? 1020 : 744}
                    className="w-full h-full"
                    src={isMobile ? image.testimonialMobileUrl : image.testimonialDesktopUrl}
                    layout='responsive'
                    alt={`Testimonial Image ${index + 1}`}
                />
            </div>

            <p className='z-40 absolute sm:top-14 top-6 sm:text-base text-sm sm:left-14 left-3
                    text-white sm:w-[300px] w-[247px] font-bold testimonials'>
                {image.testimonialDescription}
            </p>

            {image.testimonialVideoUrl && (
                <Link href={image.testimonialVideoUrl}>
                    <div className='z-40 cursor-pointer absolute sm:bottom-8 bottom-4 sm:left-14 left-3
                   bg-primaryColor sm:px-3 sm:py-2 py-1 px-2 font-semibold text-white sm:text-base text-[14px]'>{t('Home.Watch_Video')}</div>
                </Link>
            )}
        </div>
    )) 

    // const compareTractorData = getHomePageTractorsListBasedOnInventory(inventoryList);

    const compareTractorData = useMemo(() =>
        getHomePageTractorsListBasedOnInventory(inventoryList),
        [inventoryList]);


    const customStyles = {
        content: {
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: '0',
            width: '100%',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            border: 'none',
        },
    };

    const requestCustomStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <>
            {/* Home SLider */}
 
            <div className='relative'>

                <MultipleItemsSlide settings={contentGallerysettings} id={'bannerGallery'} items={bannerGalleryitems} />

                <div className=" sm:flex hidden fixed z-[99] top-1/2 right-0 transform -translate-y-1/2  flex-col items-center justify-center rounded-md shadow-sm" role="group">

                    <button type="button" className="p-3 w-[50px] bg-white border-t-[1px] border-l-[1px] border-primaryColor">
                        <Link href="tel:18006669999"><Image src={Call} alt='call' className='w-full' /></Link>
                    </button>

                    <button type="button" className="p-3 w-[50px] bg-white border-t-[1px] border-l-[1px] border-primaryColor">
                        <Link href="sell-tractor">
                            <Image src={Tractor} alt='tractor' className='w-full' />
                        </Link>
                    </button>

                    <button type="button" className="p-3 w-[50px] bg-white border-t-[1px] border-l-[1px] border-primaryColor">
                        <Image src={Thumb} alt='thumb' className='w-full' />
                    </button>

                    <button type="button" className="p-3 w-[50px] bg-white border-t-[1px] border-l-[1px] border-b-[1px] border-primaryColor" onClick={handleShareClick}>
                        <Image src={Share} alt='Share' className='w-full' />
                    </button>

                </div>

            </div>

            {isVisible && (
                <div className='sm:hidden block'>
                    <div className='fixed bottom-0 w-full z-40
           bg-secondaryColor rounded-tl-2xl rounded-tr-2xl text-white'>
                        <div className='flex text-[15px]'>
                            <div className='text-center border-r border-[#FFFFFF] border-opacity-25 px-4 py-3 w-1/4'>
                                <Image src={homeIcon} alt="homeIcon" width={20} height={20} />
                                <p>{t('Home.Home')}</p>
                            </div>

                            <div className='text-center border-r border-[#FFFFFF] border-opacity-25 px-4 py-3 w-1/4' onClick={isShowCallModal}>
                                <Image src={callIcon} alt="callIcon" width={20} height={20} />
                                <p>{t('Home.Call')}</p>
                            </div>

                            <div className='text-center border-r border-[#FFFFFF] border-opacity-25 px-4 py-3 w-1/4'>
                                <Image src={enquiryIcon} alt="enquiryIcon" width={20} height={20} />
                                <p> <Link href="/enquiry">{t('Home.Enquiry')}</Link></p>
                            </div>

                            <div className='text-center px-4 py-3 w-1/4' onClick={handleShareClick}>
                                <Image src={shareIcon} alt="shareIcon" width={20} height={20} />
                                <p>{t('Home.Share')}</p>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Explore Tractor World  */}
            < div className="lg:px-14 md:px-6 sm:px-3 px-2 mb-3 pt-4 bg-white " >
                <Heading heading={t('Home.Explore_Tractor_World')} viewButton={false} />
                <div className='grid sm:grid-cols-6 grid-cols-3 pb-4'>
                    {exploreimages.map((item, index) => (
                        <Link href={item.url} key={index} className='w-full'>
                            <Image src={item.image} className='cursor-pointer' layout='responsive' alt={`Explore item ${index + 1}`} />
                        </Link>
                    ))
                    }
                </div>

            </div >

            {/* Live Inventory */}
            <div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2 bg-white " >
                <Heading heading={t('Home.Live_Inventory')} viewButton={true} onClick={handleAllLiveInventory} className='mt-8' />
                {!inventoryList ? (
                    <p>Loading inventoryList data...</p>
                ) : (
                    <LiveInventoryContainer locale={locale} data={inventoryList} />
                )}
            </div >

            {/* why choose us */}
            < div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:py-4 py-2 relative bg-white mt-3" >
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
                    <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-4 w-full relative
                     z-10 sm:pb-0 pb-16">
                        {WhyChooseItems.map((item, index) => (
                            <div key={index}>
                                <div className="bg-white overflow-hidden flex justify-center 
                                shadow-custom-medium sm:px-4 px-2 sm:pb-9 py-2 flex-col items-center">
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
            </div >

            {/* Compare To Buy The Right Tractor sec */}
            < div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:py-4 py-2 bg-white mt-3" >
                <div className="font-bold xl:text-xl lg:text-lg md:text-base text-xl">
                    <p className="mb-[-5px]">{t('Home.Buy_The_Right')}</p>
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
                                        //{compareTractorData[key].map((item, index) => (
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

                                            {/* <Btn className="uppercase" text={t('Home.COMPARE')} onClick={handleCompareAll} /> */}

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

            {/*testimonials */}
            <div id="testimonials">
                <div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 my-3">
                    <Heading heading={t('Home.Testimonials')} viewButton={true} onClick={handleAllContentHub} />
                </div>

                <div className="mb-4">
                    <MultipleItemsSlide settings={contentGallerysettings} id={'testimonialsGallery'} items={testimonialsGalleryItems} />
                </div>
            </div>

            {/*Content Gallery */}
            <div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:py-4 py-2" style={{
                backgroundImage: `url('/images/exclusiveOffersBG.svg')`,
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat'
            }}>

                <Heading heading={t('Home.Content_Gallery')} viewButton={true} onClick={handleContentGallery} />

                <div className="">
                    <div className="grid sm:grid-cols-3 grid-cols-1 md:gap-6 gap-4 mt-4">

                        {contentGalley.map((card, index) => (
                            <div key={index} className="bg-white overflow-hidden shadow-lg flex-none">
                                <div className="relative">
                                    <Image
                                        className="w-full"
                                        src={card.contentGalleyUrl}
                                        alt={`Image for ${card.index + 1}`}
                                        layout="responsive"
                                        width={100}
                                        height={70}
                                    />
                                    <div className="bg-white px-4 py-2 text-black text-sm absolute top-4 right-4 uppercase font-bold">
                                        {card.contentGalleyBadge}
                                    </div>
                                </div>
                                <div className="xl:px-6 lg:px-4 sm:px-2 px-4 py-4">
                                    <div className="mb-2 font-bold">
                                        {card.contentGalleyTitle}
                                    </div>
                                    <p>{card.contentGalleyDate}</p>
                                </div>
                                <ReadMore onClick={() => window.open(card.contentGalleyURL, '_blank')} />

                            </div>
                        ))}

                    </div>
                </div>

                <div className='mt-4'>
                    <Btn text={t('Home.View_All')} viewAll={true} />
                </div>
            </div>

            {/* Latest News & Updates */}
            <div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:py-4 py-2">
                <Heading heading={t('Home.Latest_News_And_Update')} viewButton={true} onClick={handleAllContentHub} />

                <div className="">
                    <div className="grid sm:grid-cols-3 grid-cols-1 md:gap-6 gap-4 mt-4">
                        {latestNewsGalley.map((newsData, index) => (
                            <div key={index} className="bg-white overflow-hidden shadow-lg flex-none">
                                <div className="relative">
                                    <Image className="w-full" src={newsData.contentGalleyUrl} alt={`cardImage-${index + 1}`} layout="responsive" width={100} height={70} />
                                    <div className="bg-white px-4 py-2 text-black text-sm absolute top-4 right-4 uppercase font-bold">
                                        {newsData.contentGalleyBadge}
                                    </div>
                                </div>
                                <div className="xl:px-6 lg:px-4 sm:px-2 px-4 py-4 sm:h-52">
                                    <div className="mb-4 font-bold">{newsData.contentGalleyDate}</div>
                                    <div className="font-bold xl:text-xl md:text-lg sm:text-[17px] text-xl mb-2">
                                        {newsData.contentGalleyTitle}
                                    </div>
                                    <p
                                        className="truncate-3-lines text-grayColor xl:text-base lg:text-sm sm:text-sm text-base"
                                        dangerouslySetInnerHTML={{ __html: newsData.contentGalleyDescription }}
                                    ></p>
                                </div>
                                <ReadMore />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='mt-4'>
                    <Btn text={t('Home.View_All')} viewAll={true} />
                </div>
            </div>

            <Modal
                CloseIconShow={false}
                showModal={showModal}
                customStyles={customStyles}
                handleClose={handleClose}
                content={
                    <>
                        <div className="block mb-4 text-center mx-auto" onClick={handleClose} >
                            <Image
                                src={Crossmark}
                                width={35}
                                height={35}
                                alt="Close Icon"
                                className="cursor-pointer"
                            />
                        </div>

                        {/* Modal Content */}
                        <div className="rounded-tl-[20px] rounded-tr-[20px] bg-white py-10 px-4 flex flex-col items-center sm:flex-row sm:items-start">
                            <div className="flex flex-col gap-4 w-full font-bold">
                                <div className='bg-secondaryColor w-full text-white p-2 text-center rounded'><Link href="tel:18006669999">{t('Home.Call_Now')}</Link></div>
                                <div className='bg-primaryColor w-full text-white p-2 text-center rounded' onClick={handleRequestCall}>{t('Home.Request_Call')}</div>

                            </div>
                        </div>
                    </>
                }
            />

            <Modal showModal={showCallRequestModal} customStyles={requestCustomStyles} handleClose={handleClose} content={
                <div className='flex items-center sm:flex-row flex-col-reverse w-full'>
                    <div className='w-full px-4 pb-4'>
                        <div className='mb-2'>
                            <label className='mb-2 block'>{t('Loan.Name')}</label>
                            <input type='text' placeholder={t('Loan.Enter_Name')} className='w-full rounded border-[#d1cccc]' />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2 block'>{t('Loan.Mobile_No')}</label>
                            <input type='text' placeholder={t('Laon.Enter_Mobile_NO')} className='w-full rounded border-[#d1cccc]' />
                        </div>
                        <div className='w-full mt-3'>
                            <Btn text={t('Home.Submit')} bgColor={true} />
                        </div>
                    </div>
                    <div className="sm:relative w-[329px] h-[223px] overflow-hidden">
                        <Image
                            src={languagePopupImg}
                            layout='responsive'
                            width={610}
                            height={452}
                            className='languagePopupImg'
                            alt='languagePopupImg'
                        />
                    </div>

                </div>
            } />
        </>



    )
}
