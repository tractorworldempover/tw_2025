import React from "react";
import Image from "next/image";
import Layout from '@components/Layout';
import Banner from '@components/Banner';
import Heading from '@components/Heading';
import TractorInfo from "@components/TractorInfo";
import RentalSteps from '@Images/about/rentalSteps.svg';
import Btn from '@components/Btn';
import bannerImg from '@Images/liveInventory/banner.svg';
import tractorImg from '@Images/about/tractor.svg';
import { useTranslation } from "next-i18next";  
// import { getLocaleProps } from "@helpers";

// export async function getServerSideProps(context) {
//   return await getLocaleProps(context);
// } 
  
export default function About({locale}) {
  const language = locale?.toUpperCase();
  const { t, i18n } = useTranslation('common');
  
  // console.log("Language Selected: " + activeLocale); 

  const breadcrumbData = [
    { label: t('Home.Home'), link: '/' },
    { label: t('Navbar.Aboutus'), link: '#' },
  ];

  return ( 
    <Layout currentPage={"about"}>
      <Banner breadcrumbs={breadcrumbData} bannerImg={bannerImg} heading={'About Us'} />

      {/* tractor info sec */}
      <div className="bg-white mt-4 lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2">
        <Heading heading={t('Footer.About_Us')} />
        <TractorInfo infoImg={tractorImg}
          title={t('About.Bring_You_To_Future')}
          heading={t('About.Tractor_World')}
          infoText={t('About.Fully_Integrated_Compony')}
        />
      </div>

      {/*Tractors Dealers by Brands sec*/}
      <div className="bg-white mt-4 lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4 sm:pb-8 py-2">
        <Heading heading={t('About.Tractors_By_Brands')} viewButton={false} />
        {/* <form className="sm:block hidden">
          <div className='flex sm:flex-row flex-col gap-4 mt-4 items-end'>
            <div className='sm:w-1/4 w-full'>
              <label htmlFor="Brand" className="block mb-2">Brand</label>
              <select id="Brand" className="bg-white border 
                    border-gray-300 text-black rounded-md  block w-full 
                     p-2.5 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white 
                     ">
                <option selected>Select Your Brand</option>

              </select>
            </div>


            <div className='sm:w-1/4 w-full'>
              <label htmlFor="Brand" className="block mb-2">State</label>
              <select id="Brand" className="bg-white border 
                    border-gray-300 text-black rounded-md  block w-full 
                     p-2.5 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white">
                <option selected>Select Your State</option>

              </select>
            </div>


            <div className='sm:w-1/4 w-full'>
              <label htmlFor="Brand" className="block mb-2">District</label>
              <select id="Brand" className="bg-white border 
                    border-gray-300 text-black rounded-md  block w-full 
                     p-2.5 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white 
                     ">
                <option selected>Select Your District</option>

              </select>
            </div>





            <div className='sm:w-1/4 w-full'>
              <div className='bg-secondaryColor px-2 py-3 text-white text-center
              rounded-md font-semibold cursor-pointer'>Find Dealer</div>
            </div>
          </div>
        </form> */}
        <div className="grid sm:grid-cols-6 grid-cols-3 sm:gap-6 gap-4 mt-6">
          <Image width={259} height={252} src="/images/about/brands/mahindra.svg" alt="mahindra" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/swaraj.svg" alt="swaraj" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/elcher.svg" alt="Elcher" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/masseyFerguson.svg" alt="masseyFerguson" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/tillersTractors.svg" alt="tillersTractors" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/escorts.svg" alt="escorts" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/kartar.svg" alt="kartar" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/captain.svg" alt="captain" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/preet.svg" alt="preet" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/forceMotors.svg" alt="forceMotors" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/aceTractors.svg" alt="aceTractors" className="w-full" />
          <Image width={259} height={252} src="/images/about/brands/autonxt.svg" alt="autonxt" className="w-full" />
        </div>
        {/* <div className="my-4 sm:hidden block">
          <Btn text={'view all'} />
        </div> */}
      </div>

      {/*rental steps sec */}
      <div className="bg-white my-4 lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-4">
        <p className="text-[#888888] text-sm mb-3">{t('About.Right_Equipment')}</p>
        <Heading heading={t('About.Get_Your_Rentals')} />

        <div className="image-wrapper sm:overflow-hidden overflow-x-auto">
          <div className="sm:min-w-full min-w-[586px]">
            <Image
              src={language === 'HI' ? '/images/about/rentalStepsHi.svg' : language === 'MR' ?'/images/about/rentalStepsMr.svg' : '/images/about/rentalSteps.svg' }
              layout="responsive"
              width={1673}
              height={493}
              alt="rentalSteps"
              className="w-full"
            />
          </div>
        </div>


      </div>

    </Layout >
  )
}
