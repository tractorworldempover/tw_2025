import React from 'react';
import Image from "next/image";
import Layout from '@components/Layout';
import Banner from '@components/Banner';
import Heading from '@components/Heading';
import TractorInfo from "@components/TractorInfo";
import Dealer1 from "@Images/dealer/dealer1.svg";
import Phn from "@Images/dealer/phn.svg";
import Mail from "@Images/dealer/mail.svg";
import Location from "@Images/dealer/location.svg";
import Btn from '@components/Btn';
import Slider from "react-slick";
import Instagram from '@Images/dealer/instagram.svg';
import Twitter from '@Images/dealer/twitter.svg';
import Facebook from '@Images/dealer/facebook.svg';
import bannerImg from '@Images/liveInventory/banner.svg';
import tractorImg from '@Images/about/tractor.svg'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'next-i18next';
import { getLocaleProps } from "@helpers";

export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}

export default function dealers() {
  const { t, i18n } = useTranslation('common');

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    const breadcrumbData = [
        { label: 'Home', link: '/' },
        { label: 'About Us', link: '/about' },
        { label: 'Dealers', link: '#' },
    ];

    const dealerData = [
        {
            name: "A & S TRACTORS",
            owner: "Kammari Narayana Chari",
            phone: "+91 95533 53077",
            email: "Narayana970541@gmail.com",
            address: "Chaktaj, Katfhara, Sidpur, Ghazipur Uttar Pradesh - 233301",
            image: Dealer1
        },
        {
            name: "A & S TRACTORS",
            owner: "Kammari Narayana Chari",
            phone: "+91 95533 53077",
            email: "Narayana970541@gmail.com",
            address: "Chaktaj, Katfhara, Sidpur, Ghazipur Uttar Pradesh - 233301",
            image: Dealer1
        },
        {
            name: "A & S TRACTORS",
            owner: "Kammari Narayana Chari",
            phone: "+91 95533 53077",
            email: "Narayana970541@gmail.com",
            address: "Chaktaj, Katfhara, Sidpur, Ghazipur Uttar Pradesh - 233301",
            image: Dealer1
        },
        {
            name: "A & S TRACTORS",
            owner: "Kammari Narayana Chari",
            phone: "+91 95533 53077",
            email: "Narayana970541@gmail.com",
            address: "Chaktaj, Katfhara, Sidpur, Ghazipur Uttar Pradesh - 233301",
            image: Dealer1
        },
        {
            name: "A & S TRACTORS",
            owner: "Kammari Narayana Chari",
            phone: "+91 95533 53077",
            email: "Narayana970541@gmail.com",
            address: "Chaktaj, Katfhara, Sidpur, Ghazipur Uttar Pradesh - 233301",
            image: Dealer1
        },
        {
            name: "A & S TRACTORS",
            owner: "Kammari Narayana Chari",
            phone: "+91 95533 53077",
            email: "Narayana970541@gmail.com",
            address: "Chaktaj, Katfhara, Sidpur, Ghazipur Uttar Pradesh - 233301",
            image: Dealer1
        },
        {
            name: "A & S TRACTORS",
            owner: "Kammari Narayana Chari",
            phone: "+91 95533 53077",
            email: "Narayana970541@gmail.com",
            address: "Chaktaj, Katfhara, Sidpur, Ghazipur Uttar Pradesh - 233301",
            image: Dealer1
        },
        {
            name: "A & S TRACTORS",
            owner: "Kammari Narayana Chari",
            phone: "+91 95533 53077",
            email: "Narayana970541@gmail.com",
            address: "Chaktaj, Katfhara, Sidpur, Ghazipur Uttar Pradesh - 233301",
            image: Dealer1
        },
    ];

    return (
        <>
            <Layout>
                <Banner breadcrumbs={breadcrumbData} bannerImg={bannerImg}
                    heading={'Dealers'} />
                <div className="bg-white mt-4 lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2">
                    <Heading heading={'Dealers'} />
                    {/* tractor info sec */}
                    <TractorInfo infoImg={tractorImg}
                        title={'We bring you to the future'}
                        heading={'Tractor World'}
                        infoText={'Tractor world is a fully vertically integrated company, with expertise in design, development and manufacture of the full spectrum of automotive components, aggregates and vehicles.'}
                    />

                </div>
                <div className='bg-[#EFECEC] mt-4 lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2'>
                    <Heading heading={"Mahindra Tractor - Dealers"} viewButton={true} /> 
                    <div className=''>
                        <div className='grid sm:grid-cols-4 grid-cols-1 flex-nowrap gap-4'>
                            {dealerData.map((dealer, index) => (
                                <div key={index} className='bg-white flex-shrink-0'>
                                    <div className="slider-container" id="dealerSlide">
                                        <Slider {...settings}>
                                            <div className="relative group">
                                                <Image src={dealer.image} alt={`Slide 1 for ${dealer.name}`}
                                                    className="object-cover w-full h-full" layout='responsive' />
                                                <div className="absolute h-[96%] inset-0 bg-black  bg-opacity-70 opacity-0 
                                                group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <Image src={Instagram} alt='instagram' className='cursor-pointer' />
                                                        <Image src={Facebook} alt='facebook' className='cursor-pointer' />
                                                        <Image src={Twitter} alt='twitter' className='cursor-pointer' />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative group">
                                                <Image src={dealer.image} alt={`Slide 1 for ${dealer.name}`}
                                                    className="object-cover w-full h-full" />
                                                <div className="absolute h-[96%] inset-0 bg-black bg-opacity-70 opacity-0 
                                                group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <Image src={Instagram} alt='instagram' className='cursor-pointer' />
                                                        <Image src={Facebook} alt='facebook' className='cursor-pointer' />
                                                        <Image src={Twitter} alt='twitter' className='cursor-pointer' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative group">
                                                <Image src={dealer.image} alt={`Slide 1 for ${dealer.name}`}
                                                    className="object-cover w-full h-full" />
                                                <div className="absolute h-[96%] inset-0 bg-black bg-opacity-70 opacity-0 
                                                group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <Image src={Instagram} alt='instagram' className='cursor-pointer' />
                                                        <Image src={Facebook} alt='facebook' className='cursor-pointer' />
                                                        <Image src={Twitter} alt='twitter' className='cursor-pointer' />
                                                    </div>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                    <div className='px-2 pb-2'>
                                        <div>
                                            <p className='font-semibold'>{dealer.name}</p>
                                            <p className='font-medium py-1 border-b'>{dealer.owner}</p>
                                        </div>
                                        <div className='text-sm pt-2'>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[7%]'>
                                                    <Image src={Phn} alt='phn' />
                                                </div>
                                                <div className='w-[93%]'>{dealer.phone}</div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[7%]'>
                                                    <Image src={Mail} alt='mail' />
                                                </div>
                                                <div className='w-[93%]'>{dealer.email}</div>
                                            </div>
                                            <div className='flex gap-1 w-full'>
                                                <div className='w-[7%]'>
                                                    <Image src={Location} alt='location' />
                                                </div>
                                                <div className='w-[93%]'>{dealer.address}</div>
                                            </div>
                                        </div>
                                        <div className='flex gap-1 w-full mt-1'>
                                            <div className='w-1/2 text-[14px]'>
                                                <Btn bgColor={true} text={'Talk To Dealer'} />
                                            </div>
                                            <div className='w-1/2 text-[14px]'>
                                                <Btn bgColor={true} text={'Call Center'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> 
                    <div className="my-4 sm:hidden block">
                        <Btn text={t('Home.View_All')} />
                    </div>

                </div>
            </Layout>

        </>
    )
}
