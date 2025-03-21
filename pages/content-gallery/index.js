import React, { useState } from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Image from "next/image";
import Heading from "@components/Heading";
import Gallery1 from '@Images/conentGallery/1.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MultipleItemsSlide from "../../components/SingleItemsSlide";
import bannerImg from "@Images/sellTractor/engineering-excellence-banner.svg";
import Leftarrow from '@Images/offers/leftarrow.svg';
import Rightarrow from '@Images/offers/rightarrow.svg';
import { getLocaleProps } from "@helpers";
import { useTranslation } from "next-i18next";
import Pagination from "@components/Pagination"; 

export async function getServerSideProps(context) {
    return await getLocaleProps(context);
}
export default function ContentGallery() {
    const { t, i18n } = useTranslation('common');
    const breadcrumbData = [
        { label: t('Home.Home'), link: '/' },
        { label: t('Gallery.Content_Gallery'), link: '#' },
    ];
    const [expandedItems, setExpandedItems] = useState({});


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <Image src='/images/conentGallery/rightArrow.svg' width={60} height={60} className={'gallerynext-arrow'} alt='RightArrow' onClick={onClick}></Image>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <Image src='/images/conentGallery/leftArrow.svg' width={60} height={60} className={'galleryprev-arrow'} alt='LeftArrow' onClick={onClick}></Image>
        );
    }
    const contentGallerysettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const contentGalleryimages = [
        {
            image: Gallery1,
            name: "Sonalika Tractor",
        },
        {
            image: Gallery1,
            name: "Sonalika Tractor",
        },
        {
            image: Gallery1,
            name: "Sonalika Tractor",
        },
        {
            image: Gallery1,
            name: "Sonalika Tractor",
        },
    ];

    const contentGalleryitems = contentGalleryimages.map((src, index) => (
        <div key={index} className="relative">
            <Image src={src.image} width={1644} height={919} layout="responsive" alt={`Explore item ${index + 1}`} />
            <div className="absolute top-0 bg-primaryColor text-white px-2 uppercase text-[13px] py-1">{src.name}</div>
        </div>
    ));

    const galleryDetails = [
        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "1",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },
        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "2",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },
        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "3",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },

        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "4",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },

        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "5",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },

        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "6",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },

        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "7",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },

        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "8",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },

        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "9",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },

        {
            thumbnail: "/images/conentGallery/tractor1.svg",
            tractorname: "Sonalika Tractor",
            heading: "Popular Sonalika Tractor Series Price List 2024: Specifications & Mileage",
            date: "February 19, 2024",
            id: "10",
            description: "The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things The Sonalika Tractor Series is well-known worldwide for its advanced technology in agriculture. These tractors are tough and smart, helping farmers with tasks like plowing fields and moving heavy things…"
        },

    ];

    const newUpdateDetails = [
        {
            thumbnail: "/images/conentGallery/videoThumbnail_one.svg",
            discription: "Bridgestone the agricultural tyre expert",
            alt: 'videoThumbnail'
        },
        {
            thumbnail: "/images/conentGallery/videoThumbnail_one.svg",
            discription: "Bridgestone the agricultural tyre expert",
            alt: 'videoThumbnail'
        },

        {
            thumbnail: "/images/conentGallery/videoThumbnail_one.svg",
            discription: "Bridgestone the agricultural tyre expert",
            alt: 'videoThumbnail'
        },

        {
            thumbnail: "/images/conentGallery/videoThumbnail_one.svg",
            discription: "Bridgestone the agricultural tyre expert",
            alt: 'videoThumbnail'
        },

    ];


      //pagination
      const CardsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = Math.ceil(galleryDetails.length / CardsPerPage);
      const indexOfLastCard = currentPage * CardsPerPage;
      const indexOfFirstCard = indexOfLastCard - CardsPerPage;
      const currentCards = galleryDetails.slice(indexOfFirstCard, indexOfLastCard);  
   

    const toggleDescription = (index) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div>
            <Layout currentPage={"contentGallery"}>
                <Banner
                    breadcrumbs={breadcrumbData}
                    heading={""}
                    bannerImg={bannerImg}
                    BannerUnderlineImg={false} />

                <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
                    <Heading heading={t('Gallery.Content_Gallery')} />
                    <hr className="mt-2 mx-2"></hr>
                    <div className="mb-4 p-2">
                        <MultipleItemsSlide settings={contentGallerysettings} id={'contentGallery'} items={contentGalleryitems} />
                    </div>

                    <div className="bg-[#F3F3F4] sm:pt-3 pt-2 py-3 my-6"></div>

                    <div className="flex flex-col gap-3">
                        {currentCards.map((item, index) => (
                            <div className="border-b pb-3 p-1 relative" key={index}>
                                <div className="flex gap-3">
                                    <div className="sm:w-[350px] sm:h-[200px] w-[240px]">
                                        <Image
                                            src={item.thumbnail}
                                            layout="responsive"
                                            width={350}
                                            height={200}
                                            className="cursor-pointer"
                                            alt={item.tractorname}

                                        />
                                    </div>
                                    <div>
                                        <div className="bg-primaryColor inline-block sm:px-2 px-1 py-1 text-white w-auto font-semibold sm:text-base text-sm">{item.tractorname}</div>
                                        <div className="font-semibold py-2 sm:text-base text-[12px]">{item.heading}</div>
                                        <div className="sm:text-sm text-[10px] text-[#606C7E] uppercase font-bold flex sm:gap-2 gap-1 items-center">{t('About.Tractor_World')}
                                            <div className="sm:w-2 w-1 sm:h-2 h-1 bg-[#CCCCCC] rounded-full"></div>
                                            <span>{item.date}</span></div>
                                    </div>
                                </div>
                                <p className="sm:mt-0 mt-2 sm:text-base text-sm">
                                    {expandedItems[item.id] ? item.description : `${item.description.slice(0, 250)}...`}

                                    <span
                                        className="text-[#407BD2] sm:uppercase text-sm cursor-pointer"
                                        onClick={() => toggleDescription(item.id)}
                                    >
                                        {expandedItems[item.id] ? t('SellTractor.Read_less') + ' »' : t('SellTractor.Read_more') + ' »'}
                                    </span>
                                </p>
                            </div>
                        ))}

                        <Pagination
                            data={galleryDetails}
                            TotalPages={totalPages}
                            CurrentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />

                        {/* <p className="sm:mt-0 mt-2 sm:text-base text-sm">Farmtrac tractors simplify farming tasks through their efficient engines and consistent performance. They provide farmers with a dependable choice to increase their agricultural income. Utilising the popular Farmtrac tractor reduces.</p> */}
                    </div>


                    {/* ///new updates */}

                    <div className="mt-4">
                        <Heading heading={t('Gallery.New_Updates')} />
                        <div className="overflow-x-auto sm:overflow-visible">
                            <div className="flex sm:grid sm:grid-cols-4 gap-8">
                                {newUpdateDetails.map((item, index) => (
                                    <div className="bg-[#6521780F] bg-opacity-20 overflow-hidden shadow-md flex-none w-80 sm:w-auto" key={index}>
                                        <Image src={item.thumbnail} width={344} height={200} className="w-[100%] cursor-pointer" alt={item.alt} />
                                        <div className="py-2 px-3">{item.discription}</div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Heading heading={t('Gallery.Recent_Posts')} />

                        <ul className="ml-4">
                            <li className="list-disc text-sm mb-2">Popular Sonalika Tractor Series Price List 2024 : Specifications & Mileage</li>
                            <li className="list-disc text-sm mb-2">Popular Swaraj Tractor Series Price List 2024: Specifications & Mileage</li>
                            <li className="list-disc text-sm mb-2">Most Popular Kubota Tractor Series in India 2024 : Price & Features</li>
                            <li className="list-disc text-sm mb-2">Top 5 Farmtrac 60 HP Tractors in India 2024 : Price & Features</li>
                            <li className="list-disc text-sm mb-2">What is Front Pto Tractor In India? Front PTO Types and Uses</li>
                        </ul>
                    </div>
                </div>

            </Layout>
        </div>
    );
}
