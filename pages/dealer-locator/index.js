import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Image from "next/image";
import Men from "@Images/men.svg";
import BrandImg from "@Images/dealerLocator/BrandImg.svg";
import ProfileImg from "@Images/dealerLocator/Profile.png";
import LocationImg from "@Images/dealerLocator/LocationImg.svg";
import CallImg from "@Images/dealerLocator/callImg.svg";
import MailImg from "@Images/dealerLocator/mailImg.svg";
import Btn from "@components/Btn";
import bannerImg from "@Images/dealerLocator/dealerBanner.svg";
import { useRouter } from 'next/router';
import Pagination from "@components/Pagination";
import Heading from "@components/Heading";
import { useTranslation } from 'next-i18next';
import { getLocaleProps } from "@helpers";
import Instagram from '@Images/dealer/instagram.svg';
import Twitter from '@Images/dealer/twitter.svg';
import Facebook from '@Images/dealer/facebook.svg';
import Phn from "@Images/dealer/phn.svg";
import Mail from "@Images/dealer/mail.svg";
import Location from "@Images/dealer/location.svg";
import { getDealersData } from "../../utils";


export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}

export default function DealerLocator({ locale }) {
  const { t, i18n } = useTranslation('common');
  const [currentPage, setCurrentPage] = useState(1);
  const language = locale?.toUpperCase();
  const router = useRouter();

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  
  const [locations, setLocations] = useState({});
  const dealerRightData = getDealersData();

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

  useEffect(() => {
    fetch("https://used-tractor-backend.azurewebsites.net/user/web/user-location-details/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        const locationData = data.data || {}; // Ensure it's an object
        setLocations(locationData);
        const uniqueStates = [...new Set(Object.values(locationData).map(item => item.state))];
        console.log("Extracted States:", uniqueStates);
        setStates(uniqueStates);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        alert("Error fetching data: " + error.message);
      });
  }, []);

  const handleStateChange = (event) => {
    const selected = event.target.value;
    setSelectedState(selected);
    const filteredDistricts = Object.keys(locations).filter(
      (district) => locations[district].state === selected
    );
    console.log("Filtered Districts:", filteredDistricts);
    setDistricts(filteredDistricts);
  };

  const handleDistrictChange = (event) => {
    const selected = event.target.value;
    setSelectedDistrict(selected);
  }
 
  const [filteredDealers, setFilteredDealers] = useState(dealerRightData);

  const handleDealersShow = () => {
    const filtered = dealerRightData.filter((dealer) => {
      return (
        (!selectedState || dealer.address.includes(selectedState)) &&
        (!selectedDistrict || dealer.address.includes(selectedDistrict))
      );
    });
    setFilteredDealers(filtered);
  };

  //pagination
  const CardsPerPage = 9;
  const totalPages = Math.ceil(filteredDealers.length / CardsPerPage);
  const indexOfLastCard = currentPage * CardsPerPage;
  const indexOfFirstCard = indexOfLastCard - CardsPerPage;
  const currentCards = filteredDealers.slice(indexOfFirstCard, indexOfLastCard);

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
                  <select
                    className="block w-full px-2 py-[7px] border border-gray-300 rounded-md text-[14px] mt-2"
                    onChange={handleStateChange}
                    value={selectedState}
                  >
                    <option value="">{t("Dealer.Select_State")}</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">{t('Dealer.District')}</label>
                  <select
                    className="block w-full px-2 py-[7px] border border-gray-300 rounded-md text-[14px] mt-2" onChange={handleDistrictChange}>
                    <option value="">{t("Dealer.Select_District")}</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <Btn text={t('Dealer.Find_Dealer')} bgColor={true} onClick={handleDealersShow} />

                <div>
                  <p className="font-bold py-3 text-black text-lg">{t('Dealer.Tractore_Dealer_List')}</p>
                </div>

                <div className="flex flex-col gap-3">
                  {dealerRightData.slice(0, 4).map((card, dealerDataIndex) => (
                    <div className="slider-container pb-4" key={dealerDataIndex}>
                      <div className="card bg-[#EEEEF0] mb-2">
                        <span className="w-full px-2 py-1 rounded-md inline-block cursor-pointer font-bold text-black text-sm"
                          id="location-span">
                          {card.name}
                        </span>
                        <div className="bg-[#F6F6F6] pt-2">
                          <div className="flex gap-1 mb-2">
                            <div>
                              <Image src={card.image} alt="men" />
                            </div>
                            <div>
                              <div className="text-[11px]">
                                <div className="flex gap-2 mb-1">
                                  <div className="w-[10%]">
                                    <Image src={ProfileImg} alt="LocationImg" width={13} height={16} />
                                  </div>
                                  <p className="w-[90%]">
                                    <b>{card.owner}</b></p>
                                </div>
                                <div className="flex gap-2 mb-1">
                                  <div className="w-[10%]">
                                    <Image src={LocationImg} alt="LocationImg" width={15} height={15} />
                                  </div>
                                  <p className="w-[90%]">{card.address}</p>
                                </div>
                                <div className="flex gap-2 mb-1">
                                  <div className="w-[10%]">
                                    <Image src={CallImg} alt="callImg" width={14} height={14} />
                                  </div>
                                  <p className="w-[90%]">{card.phone}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Btn text={t('Dealer.Know_More')} onClick={() => router.push(`/store-inventory?state=${card.location}&id=${card.id}`)} bgColor={true} />
                        </div>
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            </div>

            <div className="bg-white p-4 sm:w-[75%] w-full">
              <>
                {currentCards.length === 0 ? (
                  <p className="flex items-center justify-center mt-60">No Data available</p>
                ) : (
                  <div className="grid sm:grid-cols-3 grid-cols-1 flex-nowrap gap-4">
                    {currentCards.map((dealer, index) => (
                      <div key={index} className="bg-white flex-shrink-0">
                        <div className="slider-container cursor-pointer" id="dealerSlide">
                          <Slider {...settings}>
                            <div
                              className="relative group"
                              onClick={() => router.push(`/store-inventory?state=${dealer.location}&id=${dealer.id}`)}
                            >
                              <Image
                                src={dealer.image}
                                alt={`Slide 1 for ${dealer.name}`}
                                className="object-cover w-full h-full"
                                layout="responsive"
                              />
                            </div>

                            <div
                              className="relative group"
                              onClick={() => router.push(`/store-inventory?state=${dealer.location}&id=${dealer.id}`)}
                            >
                              <Image
                                src={dealer.image}
                                alt={`Slide 2 for ${dealer.name}`}
                                className="object-cover w-full h-full"
                              />
                            </div>

                            <div
                              className="relative group"
                              onClick={() => router.push(`/store-inventory?state=${dealer.location}&id=${dealer.id}`)}
                            >
                              <Image
                                src={dealer.image}
                                alt={`Slide 3 for ${dealer.name}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </Slider>
                        </div>

                        <div className="px-2 pb-2">
                          <div>
                            <p className="font-semibold ellipsis">{dealer.name}</p>
                            <p className="font-medium py-1 border-b">{dealer.owner}</p>
                          </div>

                          <div className="text-sm pt-2">
                            <div className="flex gap-1 w-full">
                              <div className="w-[7%]">
                                <Image src={Phn} alt="phn" />
                              </div>
                              <div className="w-[93%]">{dealer.phone}</div>
                            </div>

                            <div className="flex gap-1 w-full">
                              <div className="w-[7%]">
                                <Image src={Location} alt="location" />
                              </div>
                              <div className="w-[93%] line-clamp-2">{dealer.address}</div>
                            </div>
                          </div>

                          <div className="flex gap-1 w-full mt-1">
                            <div className="w-1/2 text-[14px]">
                              <a href={`tel:${dealer.phone}`}>
                                <Btn bgColor={true} text="Talk To Dealer" />
                              </a>
                            </div>
                            <div className="w-1/2 text-[14px]">
                              <a href={dealer.Google_Location} target="_blank" rel="noopener noreferrer">
                                <Btn bgColor={true} text="Get Directions" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </>

              <Pagination
                data={filteredDealers}
                TotalPages={totalPages}
                CurrentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
