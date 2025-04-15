import React, { useState} from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Btn from "@components/Btn";
import Image from "next/image";
import bannerImg from '@Images/contentHub/banner.svg';
import Tab from '@components/Tab';
import Heading from '@components/Heading';
import { getLocaleProps } from "@helpers";
import { useTranslation } from "next-i18next";
import { useQuery } from "@apollo/client"; 
import { HOMEPAGE_QUERIES }from "@utils/constants"; 
import { ReadMore } from '@components/ReadMore';
import Link from "next/link";
import Modal from "@components/Modal";


export async function getServerSideProps(context) {
    return await getLocaleProps(context);
  } 

export default function ContentHUb({ locale}) {
    const { t, i18n } = useTranslation('common');

    // current language from i18n
    const language = "EN";
    const breadcrumbData = [
        { label:  t('Home.Home'), link: '/' },
        { label:  t('Home.Content_Hub'), link: '#' },
    ];


    const [activeTab, setActiveTab] = useState("videoData");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleOpenModal = (content) => {
        let embedUrl = content.videoUrl.replace("youtu.be/", "www.youtube.com/embed/");
        embedUrl = embedUrl.replace("youtube.com", "youtube-nocookie.com");  // Ensure privacy-friendly mode
        setModalContent({ ...content, videoUrl: embedUrl });
        setIsModalOpen(true);
    };         

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const videos = [
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg",
            videoUrl: "https://youtu.be/Wo05ugIbkD8"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg",
            videoUrl: "https://youtu.be/0I3iAlrHH04"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg",
            videoUrl: "https://youtu.be/Wo05ugIbkD8"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg",
            videoUrl: "https://youtu.be/0I3iAlrHH04"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg",
            videoUrl: "https://youtu.be/0I3iAlrHH04"
        },
        {
            name: "Mr. Chari",
            description: "Rising from financial hardships to owning multiple tractors",
            date: "09-July-2024, 12:00 PM",
            thumbnail: "/images/contentHub/videoThumbnail.svg",
            videoUrl: "https://youtu.be/0I3iAlrHH04"
        }
    ];
    
    // Fetching the data 
    const { data, loading, error, networkStatus } = useQuery(HOMEPAGE_QUERIES, {
    variables: { lang: language },
    fetchPolicy: 'cache-first'
    });

  
    // Log the states
    React.useEffect(() => {
        console.log("Loading:", loading);
        console.log("Error:", error);
        console.log("Network Status:", networkStatus);
        console.log("Data:", data);
    }, [loading, error, networkStatus, data]); 

    const contentGalleryData = data?.contentgallerys?.nodes || [];

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
                                    <button onClick={() => handleOpenModal(video)}>
                                    <div className="w-[100%] h-[292]">
                                            <Image
                                                src={video.thumbnail}
                                                className="cursor-pointer w-full h-full"
                                                alt="videoThumbnail"
                                                width={360}
                                                height={130}
                                            />
                                        </div>
                                    </button>
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
                        <div className="">
                            <div className="grid sm:grid-cols-3 grid-cols-1 md:gap-6 gap-4 mt-4">
                            {contentGalley.map((card, index) => (
                                <div key={index} className="bg-white overflow-hidden shadow-lg flex-none">
                                    <div className="relative">
                                       <Image
                                       className="w-full"
                                       src={card.contentGalleyUrl || DefaultTractor}
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
                     )}

                </div>
            </Layout>

            {/* Modal */}
            {isModalOpen && (
            <Modal showModal={isModalOpen} handleClose={handleCloseModal} content={
            modalContent?.videoUrl ? (
                <iframe
                width="100%"
                height="315"
                src={modalContent.videoUrl.replace("youtube.com", "youtube-nocookie.com")}
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>              
            ) : (
            <div>
                <h2>{modalContent?.contentGalleyTitle}</h2>
                <p>{modalContent?.contentGalleyDate}</p>
                <p>{modalContent?.contentGalleyBadge}</p>
            </div>
        )} 
    />
         )}
            
        </div>
    );
}

