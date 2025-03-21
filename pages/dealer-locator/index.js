import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Image from "next/image";
import Men from "@Images/men.svg";
import BrandImg from "@Images/dealerLocator/BrandImg.svg";
import LocationImg from "@Images/dealerLocator/LocationImg.svg";
import CallImg from "@Images/dealerLocator/callImg.svg";
import MailImg from "@Images/dealerLocator/mailImg.svg";
import Btn from "@components/Btn";
import bannerImg from "@Images/dealerLocator/dealerBanner.svg";
import { useRouter } from 'next/router';
import Pagination from "@components/Pagination";
import Heading from "../../components/Heading";
import { useTranslation } from 'next-i18next';
import { getLocaleProps } from "@helpers";
import { DEALERLIST_DATA } from "@utils/constants";
import Loader from '@components/Loader';
import LoaderHi from '@Images/loader.gif';
import LoaderMr from '@Images/loaderMr.gif';
import LoaderEn from '@Images/loaderEn.gif';
import { useQuery } from "@apollo/client";

export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}

export default function DealerLocator({ locale }) {
  const { t, i18n } = useTranslation('common');
  const [currentPage, setCurrentPage] = useState(1); 
  const language = locale?.toUpperCase();
  const router = useRouter();
  const breadcrumbData = [
    { label: t('Home.Home'), link: '/' },
    { label: t('Dealer.DEALER_LOCATOR'), link: '#' },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { data, loading, error } = useQuery(DEALERLIST_DATA, {
    variables: { lang: language },
  });

 


  if (error) return <p>Error: {error.message}</p>;

  const dealerListData = data?.dealerslist?.nodes || [];

  const dealersData = dealerListData.map(node => {
    const address = node.dealerlistFields.address;
    const dealerName = node.dealerlistFields.dealerName;
    const googleLocationURL = node.dealerlistFields.dealerName;
    return { address, dealerName, googleLocationURL };
  });

  //console.log(JSON.stringify(dealersData) + "dealersData");

  const handleDealerClick = () => {
    router.push('/store-inventory');
  };

  const dealerData = [
    {
      dealerCardData: [
        {
          location: "Ram Motors, Chandrapur",
          brand: "Sonalika",
          address: "Opposite Government Engineering College",
          phone: "+91 95xxxxxx77",
          email: "Narayana@gmail.com",
          images: {
            men: Men,
            brand: BrandImg,
            location: LocationImg,
            call: CallImg,
            mail: MailImg
          }
        },
        {
          location: "Ram Motors, Chandrapur",
          brand: "Sonalika",
          address: "Opposite Government Engineering College",
          phone: "+91 95xxxxxx77",
          email: "Narayana@gmail.com",
          images: {
            men: Men,
            brand: BrandImg,
            location: LocationImg,
            call: CallImg,
            mail: MailImg
          }
        },
        {
          location: "Ram Motors, Chandrapur",
          brand: "Sonalika",
          address: "Opposite Government Engineering College",
          phone: "+91 95xxxxxx77",
          email: "Narayana@gmail.com",
          images: {
            men: Men,
            brand: BrandImg,
            location: LocationImg,
            call: CallImg,
            mail: MailImg
          }
        },
      ]
    },

    {
      dealerCardData: [
        {
          location: "Ram Motors, Chandrapur",
          brand: "Sonalika",
          address: "Opposite Government Engineering College",
          phone: "+91 95xxxxxx77",
          email: "Narayana@gmail.com",
          images: {
            men: Men,
            brand: BrandImg,
            location: LocationImg,
            call: CallImg,
            mail: MailImg
          }
        },
        {
          location: "Ram Motors, Chandrapur",
          brand: "Sonalika",
          address: "Opposite Government Engineering College",
          phone: "+91 95xxxxxx77",
          email: "Narayana@gmail.com",
          images: {
            men: Men,
            brand: BrandImg,
            location: LocationImg,
            call: CallImg,
            mail: MailImg
          }
        },
        {
          location: "Ram Motors, Chandrapur",
          brand: "Sonalika",
          address: "Opposite Government Engineering College",
          phone: "+91 95xxxxxx77",
          email: "Narayana@gmail.com",
          images: {
            men: Men,
            brand: BrandImg,
            location: LocationImg,
            call: CallImg,
            mail: MailImg
          }
        },
      ]
    },

  ];


  //pagination
  const CardsPerPage = 3;
  const totalPages = Math.ceil(dealerData.length / CardsPerPage);
  const indexOfLastCard = currentPage * CardsPerPage;
  const indexOfFirstCard = indexOfLastCard - CardsPerPage;
  const currentCards = dealerData.slice(indexOfFirstCard, indexOfLastCard);


  return (
    <Layout currentPage={'dealerLocator'}>
      <Banner
        breadcrumbs={breadcrumbData}
        heading={"DEALER LOCATOR "}
        bannerImg={bannerImg} s
      />
      <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 my-3">
        <Heading heading={t('Dealer.DEALER_LOCATOR')} />
        <div className="bg-[#EFEDED] p-4">
          <div className="flex sm:flex-row flex-col gap-2">
            <div className="bg-white p-4 sm:w-[25%] w-full">
              <div>
                <p className="font-bold mb-3 text-[17px]">{t('Dealer.Search_Nearest_Dealer')}</p>
                <div className="mb-4">
                  <label className="form-label">{t('Dealer.State')}</label>
                  <select className="block w-full px-2 py-[7px] border 
                    border-gray-300 rounded-md text-[14px] text-[#B9B9B9] mt-2">
                    <option selected>{t('Dealer.Select_State')}</option>
                    <option value="madhyaPradesh">Madhya Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">{t('Dealer.District')}</label>
                  <select className="block w-full px-2 py-[7px] 
                     border border-gray-300 rounded-md  text-[14px] text-[#B9B9B9] mt-2">
                    <option selected>{t('Dealer.Select_District')}</option>
                    <option value="bhopal">Bhopal</option>
                    <option value="alirajpur">Alirajpur</option>
                    <option value="barwani">Barwani</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">{t('Dealer.Tehsil_or_Taluka')}</label>
                  <select className="block w-full px-2 py-[7px] border border-gray-300 
                    rounded-md text-[14px] text-[#B9B9B9] mt-2">
                    <option value="" selected>{t('Dealer.Select_Taluka')}</option>
                    <option value="Berasia">Berasia</option>
                    <option value="Huzur">Huzur</option>
                  </select>
                </div>
                <Btn text={t('Dealer.Find_Dealer')} bgColor={true} />

                <div>
                  <p className="font-bold py-3 text-black text-lg">{t('Dealer.Tractore_Dealer_List')}</p>
                </div>

                <div className="flex flex-col gap-3">
                  {currentCards.map((data, dealerDataIndex) => (
                    <div className="slider-container pb-4" key={dealerDataIndex}>
                      <Slider {...settings}>
                        {data.dealerCardData.map((card, dealerCardDataIndex) => (
                          <div className="card bg-[#EEEEF0] mb-2" key={dealerCardDataIndex}>
                            <span className="w-full px-2 py-1 rounded-md inline-block cursor-pointer font-bold text-black text-sm" id="location-span">
                              {card.location}
                            </span>
                            <div className="bg-[#F6F6F6] pt-2">
                              <div className="flex gap-1 mb-2">
                                <div>
                                  <Image src={card.images.men} alt="men" />
                                </div>
                                <div>
                                  <div className="text-[11px]">
                                    <div className="flex gap-2 mb-1">
                                      <div className="w-[10%]">
                                        <Image src={card.images.brand} alt="BrandImg" />
                                      </div>
                                      <p className="w-[90%]">Brand - <b>{card.brand}</b></p>
                                    </div>

                                    <div className="flex gap-2 mb-1">
                                      <div className="w-[10%]">
                                        <Image src={card.images.location} alt="LocationImg" />
                                      </div>
                                      <p className="w-[90%]">{card.address}</p>
                                    </div>

                                    <div className="flex gap-2 mb-1">
                                      <div className="w-[10%]">
                                        <Image src={card.images.call} alt="callImg" />
                                      </div>
                                      <p className="w-[90%]">{card.phone}</p>
                                    </div>

                                    <div className="flex gap-2 mb-1">
                                      <div className="w-[10%]">
                                        <Image src={card.images.mail} alt="mailImg" />
                                      </div>
                                      <p className="w-[90%]">{card.email}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Btn text={t('Dealer.Know_More')} onClick={handleDealerClick} bgColor={true} />
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  ))}
                </div>

                <Pagination
                  data={dealerData}
                  TotalPages={totalPages}
                  CurrentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />




              </div>
            </div>

            <div className="bg-white p-4 sm:w-[75%] w-full">
              <iframe
                className="w-full sm:h-[100%] h-[60vh]"
                id="map"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38194496.11757613!2d68.147344015625!3d23.906486820399638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f8fb261d14dc7%3A0x4c7b1fb4b77b7e8f!2sIndia!5e0!3m2!1sen!2sin!4v1620772645379!5m2!1sen!2sin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
