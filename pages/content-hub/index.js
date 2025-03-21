import React, { useState } from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Btn from "@components/Btn";
import Image from "next/image";
import bannerImg from '@Images/contentHub/banner.svg';
import Tab from '@components/Tab';
import Heading from '@components/Heading';
//import { getLocaleProps } from "@helpers";
import { useTranslation } from "next-i18next";  

export async function getServerSideProps(context) {
    return await getLocaleProps(context);
  } 


export default function ContentHUb() {
    const { t, i18n } = useTranslation('common');

    const breadcrumbData = [
        { label:  t('Home.Home'), link: '/' },
        { label:  t('Home.Content_Hub'), link: '#' },
    ];


    const [activeTab, setActiveTab] = useState("videoData");
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };


    const videos = [
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg"
        }
    ];


    return (
        <div>
            <Layout currentPage={"ContentHub"}>
                <Banner
                    breadcrumbs={breadcrumbData}
                    heading={t('Home.Content_Hub')}
                    bannerImg={bannerImg}
                />

                <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
                    <Heading heading={t('Home.Content_Hub')} />
                    <div className="flex sm:gap-4 gap-2 mb-4 mt-2">
                        <div className="sm:w-1/6 w-1/2">
                            <Tab id="videoData" image={true} activeTab={activeTab} onClick={handleTabClick}>
                                {activeTab === "videoData" ? <div className="text-base"> <Btn text={t('Home.Videos')} bgColor={true} /></div> : <div className="text-base"> <Btn text={t('Home.Videos')} bgColor={false} /></div>}
                            </Tab>
                        </div>
                        <div className="sm:w-1/6 w-1/2">
                            <Tab id="blogData" image={true} activeTab={activeTab} onClick={handleTabClick}>
                                {activeTab === "blogData" ? <div className="text-base"><Btn text={t('Home.Blog')} bgColor={true} /></div> : <div className="text-base">  <Btn text={t('Home.Blog')} bgColor={false} /></div>}
                            </Tab>
                        </div>
                    </div>

                    {activeTab == 'videoData' && (

                        <div className="grid sm:grid-cols-3 grid-cols-1 flex-col gap-4">

                            {videos.map((video, index) => (
                                <div className="border p-1 relative" key={index}>
                                    <div className="gap-3 sm:items-center items-start">
                                        <div className="w-[100%] h-[292]">
                                            <Image
                                                src={video.thumbnail}
                                                className="cursor-pointer w-full h-full"
                                                alt="videoThumbnail"
                                                width={360}
                                                height={130}
                                            />
                                        </div>

                                        <div>
                                            <div className="sm:text-base text-sm absolute right-3">{video.date}</div>
                                            <div className="font-semibold py-2 sm:text-base text-[14px]">{video.name}</div>
                                            <div className="sm:text-base text-[14px]">{video.description}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    )}


                    {activeTab == 'blogData' && (
                        <p>blogData</p>
                    )}

                </div>
            </Layout>
        </div>
    );
}
