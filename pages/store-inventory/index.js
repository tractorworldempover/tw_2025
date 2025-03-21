import React, {useState, useEffect} from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Heading from "@components/Heading";
import Image from "next/image";
import bannerImg from '@Images/dealerLocator/storeInventoryBanner.svg';
import bannerMblImg from '@Images/dealerLocator/mblstoreInventoryBanner.svg';
import MapIcon from '@Images/dealerLocator/mapIcon.svg';
import PhnIcon from '@Images/dealerLocator/phnIcon.svg';
import ClockIcon from '@Images/dealerLocator/clock.svg';
import Location from '@Images/dealer/location.svg';
import LiveInventoryContainer from '@components/LiveInventory';
import { useQuery } from "@apollo/client";
import { HOMEPAGE_QUERIES } from "@utils/constants";
import Loader from '@components/Loader';
//import { getLocaleProps } from "@helpers";
import LoaderHi from '@Images/loader.gif';
import LoaderMr from '@Images/loaderMr.gif';
import LoaderEn from '@Images/loaderEn.gif';

export default function StoreInventory({ locale }) {
    const breadcrumbData = [
        { label: 'Home', link: '/' },
        { label: 'Dealers Details ', link: '#' },
    ];

    const [isMobile, setIsMobile] = useState(false);

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

    const language = locale?.toUpperCase();
    const { data, loading, error } = useQuery(HOMEPAGE_QUERIES, {
        variables: { lang: language },
    });

    // Combined loading and error handling
    if (loading) return (
        <Loader loaderImage={language == 'HI' ? LoaderHi : language == 'MR' ? LoaderMr : LoaderEn} />
    );

    if (error) return <p>Error: {error.message}</p>;


    const liveInventoryData = data?.allLiveInventory?.edges || [];

    const liveInventoryList = liveInventoryData.map(({ node }) => ({
        title: node.title,
        price: node.liveInventoryData.maxPrice,
        hours: node.liveInventoryData.engineHours,
        driveType: node.liveInventoryData.driveType,
        enginePower: node.liveInventoryData.enginePower,
        slug: node.slug,
        id: node.id
    }));


    return (
        <div>
            <Layout currentPage={"dealerLocator"}>
                <Banner
                    breadcrumbs={breadcrumbData}
                    heading={""}
                    bannerImg={""} />

                <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">

                    <div>
                        <div className='sm:border-[20px] border-[10px] border-secondaryColor flex gap-4 overflow-x-auto mb-3 storeInventoryBannerImg'>

                            <div className="w-full overflow-hidden flex-none">
                                <Image src={isMobile ? bannerMblImg : bannerImg} alt="bannerImg" layout="responsive" className="" />
                            </div>

                            <div className="w-full  overflow-hidden flex-none">
                                <Image src={isMobile ? bannerMblImg : bannerImg} alt="bannerImg" layout="responsive" className="" />
                            </div>

                            <div className="w-full  overflow-hidden flex-none">
                                <Image src={isMobile ? bannerMblImg : bannerImg} alt="bannerImg" layout="responsive" className="" />
                            </div>

                        </div>
                    </div>

                    <div className="flex sm:justify-normal justify-between gap-3 items-start">
                        <div className="w-auto">
                            <Heading heading={"Srinivasa Motors"} />
                        </div>

                        <div className="flex gap-2">
                            <Image src={MapIcon} alt="mapIcon" width={27} height={27} className="cursor-pointer" />
                            <Image src={PhnIcon} alt="phnIcon" width={27} height={27} className="cursor-pointer" />
                        </div>
                    </div>

                    <div className="flex sm:flex-row flex-col mt-4 sm:gap-2 gap-3 items-start">
                        <div className="text-[14px] sm:w-[30%]">
                            <div className="flex gap-1 items-start">
                                <div className="w-[8%]">
                                    <Image src={Location} alt="Location" width={50}
                                        height={30} /></div>
                                <div className="w-[92%]">
                                    Mumbai, Sidpur, Ghazipur Maharashtra - 233301
                                </div>
                            </div>
                        </div>

                        <div className="text-[14px] sm:w-[30%]">

                            <div className="flex gap-1 items-start">
                                <div className="w-[8%]">
                                    <Image src={ClockIcon} alt="ClockIcon" width={50}
                                        height={30} /></div>
                                <div className="w-[92%]">
                                    Open Now :Mon - Sat:- 9:30 am - 6:30 pm
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="mt-4 text-[15px]">
                        <p className="font-bold">Business Statutory Details</p>
                        <p className="mt-2">Year of Establishment : <span className="text-[#212529] opacity-70">2003</span></p>

                        <div className="mt-4">
                            <p className="font-bold">About Srinivasa Motors</p>
                            <p>Srinivasa Motors in Kutbullapur, Hyderabad is known to satisfactorily cater to the demands of its customer base. The business came into existence in 2003 and has, since then, been a known name in its field. It stands located at Plot No 26, Survey No.62/A, Gandimaisamma X Roads, Kutbullapur-500055.</p>
                        </div>
                    </div>

                    {/* Live Inventory */}
                    <div className="lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2 bg-white ">
                        <LiveInventoryContainer locale={locale} data={liveInventoryList} />
                    </div>

                </div>
            </Layout>
        </div>
    );
}
export async function getServerSideProps(context) {
    return await getLocaleProps(context);
}