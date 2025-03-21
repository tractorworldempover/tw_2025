import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Heading from "@components/Heading";
import Image from "next/image";
import customerReview from "@Images/sellTractor/customer-review.svg";
import Market from "@Images/sellTractor/market.svg";
import Rupee from "@Images/sellTractor/rupee.svg";
import Certified from "@Images/sellTractor/certified.svg";
import Notifications from "@Images/sellTractor/notifications.svg";
import Support from "@Images/sellTractor/support.svg";
import BannerStrip from "@components/BannerStrip";
import bannerImg from "@Images/sellTractor/engineering-excellence-banner.svg";
import mblBannerImg from "@Images/sellTractor/mblBanner.svg";

//import { getLocaleProps } from "@helpers";
import { useTranslation } from "next-i18next";

export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}
export default function SellTractor() {
  const { t, i18n } = useTranslation('common');

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const breadcrumbData = [
    { label: t('Home.Home'), link: '/' },
    { label: t('Navbar.SellTractor'), link: '#' },
  ];
  const [isMobile, setIsMobile] = useState(false);


  const features = [
    {
      image: customerReview,
      alt: "customer-review",
      title: "Priority to Customers",
      description: "10 Lakh+ Monthly Users.",
    },
    {
      image: Market,
      alt: "market",
      title: "Fair Market Price",
      description: "Get a fair price for all the farm machines.",
    },
    {
      image: Rupee,
      alt: "rupee",
      title: "Free of Cost",
      description: "All services provided free of cost.",
    },
    {
      image: Certified,
      alt: "certified",
      title: "Genuine Buyers",
      description: "Here we provide genuine buyers.",
    },
    {
      image: Notifications,
      alt: "notifications",
      title: "Instant Notification",
      description: "Get immediate SMS notification on your phone.",
    },
    {
      image: Support,
      alt: "support",
      title: "Customer Support",
      description: "Call us at +91-97709-74974.",
    },
  ];

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


  return (
    <div>
      <Layout currentPage={"sellTractor"}>
        <Banner
          breadcrumbs={breadcrumbData}
          heading={""}
          bannerImg={!isMobile ? bannerImg : mblBannerImg}
          BannerUnderlineImg={false} />

        <BannerStrip heading={t('SellTractor.Heading')}
          content={
            <>
              <div>
                <form>
                  <div className='flex sm:flex-row flex-col gap-4 mt-4 items-end'>

                    <div className='sm:w-1/4 w-full'>
                      <label htmlFor="name" className="block mb-2">{t('Loan.Name')}</label>
                      <input type="text" id="name" className="bg-white border 
                      border-gray-300 text-black rounded-md block w-full 
                        p-2.5 dark:bg-gray-700 dark:border-gray-600 
                       dark:placeholder-gray-400 dark:text-white" placeholder={t('Loan.Enter_Name')} />
                    </div>

                    <div className='sm:w-1/4 w-full'>
                      <label htmlFor="number" className="block mb-2">{t('Loan.Mobile_No')}</label>
                      <input type="number" id="name" className="bg-white border 
                      border-gray-300 text-black rounded-md block w-full 
                        p-2.5 dark:bg-gray-700 dark:border-gray-600 
                       dark:placeholder-gray-400 dark:text-white"
                        placeholder={t('Loan.Enter_Mobile_NO')} />
                    </div>

                    <div className="sm:w-1/4 w-full">
                      <label className="block mb-2">{t('Dealer.State')}</label>
                      <select className="bg-white border border-gray-300 text-black rounded-md block w-full p-2.5 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                        <option selected>{t('Dealer.Select_State')}</option>
                        <option value="madhyaPradesh">Madhya Pradesh</option>
                        <option value="maharashtra">Maharashtra</option>
                      </select>
                    </div>

                    <div className="sm:w-1/4 w-full">
                      <label className="block mb-2">{t('Dealer.District')}</label>
                      <select className="bg-white border border-gray-300 text-black rounded-md block w-full
                       p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                        <option selected>{t('Dealer.Select_District')}</option>
                        <option value="bhopal">Bhopal</option>
                        <option value="alirajpur">Alirajpur</option>
                        <option value="barwani">Barwani</option>
                      </select>
                    </div>

                    <div className="sm:w-1/4 w-full">
                      <label className="block mb-2">{t('Dealer.Tehsil_or_Taluka')}</label>
                      <select className="bg-white border border-gray-300 text-black rounded-md block w-full p-2.5 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                        <option value="" selected>{t('Dealer.Select_Taluka')}</option>
                        <option value="Berasia">Berasia</option>
                        <option value="Huzur">Huzur</option>
                      </select>
                    </div>

                    <div className='sm:w-1/4 w-full'>
                      <div className='bg-secondaryColor px-2 py-3 text-white 
                        text-center rounded-md font-semibold cursor-pointer'>
                        {t('SellTractor.Sell_Now')}
                      </div>
                    </div>
                  </div>
                </form>

              </div>
            </>
          } />

        <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
          <Heading heading={t('SellTractor.Why_Tractor_world')} />

          <div className="">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex-none md:flex-initial w-full md:w-auto card bg-[#F6F6F6] py-4">
                  <div className="grid items-center justify-center gap-2">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      className="max-w-full h-auto"
                    />
                    <span className="text-base font-semibold text-center">{feature.title}</span>
                    <span className="text-base">{feature.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="p-2 md:bg-transparent">
          <Heading
            heading={t('SellTractor.Tractor_World_is_best_place')}
          />
          {/* <div BannerUnderlineImg={true}> */}
          <div className="sm:text-base text-[13px]">
            <p className="my-1 font-bold text-black">
              {t('SellTractor.Thinking_to_upgrade')}
            </p>

            <p className="my-1 font-bold text-black">
             {t('SellTractor.Waiting_for_bestOffres')}
            </p>

            <p className="my-1 font-bold text-black">
            {t('SellTractor.Have_an_used_tractor')}
            </p>
          </div>
          <p className="sm:text-medium text-[13px] my-2">
            {/* dynamic read more */}
            {/*{isExpanded ? item.description : `${item.description.slice(0, 250)}...`}*/}
             {/*end dynamic read more */}
            {t('SellTractor.Why_Tractor_world_info1')}
            {isExpanded && (
              <>
                {t('SellTractor.Why_Tractor_world_info2')}
              </>
            )} 
            <span
              className="text-[#407BD2] sm:uppercase text-sm cursor-pointer"
              onClick={toggleReadMore}
            >
              {isExpanded ?  t('SellTractor.Read_less') + ' »' : t('SellTractor.Read_more') + ' »'}
            </span>
          </p>

        </div>
      </Layout>
    </div>
  );
}
