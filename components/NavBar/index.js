import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Topbar from '@components/Topbar';
import Crossmark from '@Images/navbar/crossmark.png';
import Home from '@Images/navbar/home.svg';
import About from '@Images/navbar/about.svg';
import Compare from '@Images/navbar/compare.svg';
import Location from '@Images/navbar/location.svg';
import Loan from '@Images/navbar/loan.svg';
import ContentGallery from '@Images/navbar/contentGallery.svg';
import bars from '@Images/bars.svg';
import Contact from '@Images/navbar/call.svg';
import Facebook from '@Images/navbar/facebook.png';
import Xpath from '@Images/navbar/Xpath.png';
import Indeed from '@Images/navbar/indeed.png';
import Instagram from '@Images/navbar/instagram.png';
import Search from '@Images/topbar/search.svg';
import Logo from '@Images/navbar/logo.svg';
import NavbarSearch from '@Images/navbar/search.svg'
import MblLogo from '@Images/navbar/mblLogo.svg'
import EndTractor from '@Images/navbar/endTractor.png'
import sellatractor from '@Images/navbar/sellatractor.svg'
import { useTranslation } from 'next-i18next';


export default function Navbar({ currentPage, onClick, onClickForLanguage }) {
  const { locale: activeLocale, locales, asPath } = useRouter();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const openNavbar = () => {
    setIsNavbarOpen(true);
  };
  const hideNavbar = () => {
    setIsNavbarOpen(false);
  };

  const { t, i18n } = useTranslation('common'); // 'common' refers to common.json


  return (
    <>
      {/* <Topbar /> */}

      <div className={`${isNavbarOpen ? 'overlay' : 'hidden'}`}></div>

      <nav className=" bg-white z-10 sm:py-0 py-2">
        <div className="flex sm:flex-nowrap flex-wrap items-center sm:justify-between mx-auto sm:py-1
         py-0 lg:px-14 md:px-6 sm:px-3">

          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center
       p-2 w-10 h-10 justify-center text-sm text-secondaryColorrounded-lg sm:hidden dark:text-gray-400
        dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default"
            aria-expanded="false" onClick={openNavbar}>
            <Image src={bars} alt="bars" />
            {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg> */}
          </button>

          <div className="flex items-center sm:space-x-3 rtl:space-x-reverse">
            <div className="sm:block hidden">
              <Link href="/">
                <a>
                  <Image src={Logo} alt="Tractor World Logo" />
                </a>
              </Link>            </div>
            <div className="sm:hidden block">
              <Link href="/">
                <a>
                  <Image src={MblLogo} alt="Mobile Logo" />
                </a>
              </Link>

            </div>
          </div>

          <span className="sm:hidden ml-auto mr-2 mt-1" onClick={onClick}>
            <Image src={Search} alt="Search" width={25} height={25} />
          </span>

          <Link href="/sell-tractor">
            <div className="sm:hidden items-center flex bg-secondaryColor px-4 py-[2px]
         text-white text-sm mr-2 border-gradient">
              {t('Navbar.Sell')}
            </div>
          </Link>

          <div className={`${isNavbarOpen ? 'block' : 'hidden'} transition-max-height duration-300 
        ease-in-out w-full sm:block sm:w-auto`} id="navbar-default">

            <div className="sm:w-auto w-[280px] sm:h-auto h-screen
         sm:bg-transparent bg-white z-[99] sm:relative fixed top-0 sm:pb-4 pt-4 Navbar">
              <div className="sm:hidden block px-4 ">
                <div className="flex justify-between">
                  <Link href="./" >
                    <a className="self-center text-2xl font-semibold 
              whitespace-nowrap dark:text-white">
                      <Image src={MblLogo} alt="mblLogo" width={70} height={70}></Image>
                    </a>
                  </Link>
                  <div>
                    <Image src={Crossmark} onClick={hideNavbar} className="crossIcon" alt="Crossmark" /></div>
                </div>


                {/* <div className="flex my-3 w-full">
                  <div className="relative w-full">
                    <input type="text" placeholder={t('Navbar.SearchPlaceHolder')} className="w-full rounded border-[1px] border-[#D0D0D0] py-3 pr-10" />
                    <div className="absolute top-[55%] transform -translate-y-1/2 right-2">
                      <Image src={Search} alt="search" width={25} height={25} />
                    </div>
                  </div> 
                </div> */}
                
                <hr className=" border-l border-[#EFEAEA]" />
              </div>

              <ul className="font-medium flex flex-col mt-3 sm:mt-0 sm:flex-row 
             xl:space-x-2 lg:space-x-1 md:space-x-2 sm:space-x-2 rtl:space-x-reverse
              sm:items-center xl:text-base lg:text-sm
               sm:text-[0.7rem] text-[15px]  sm:px-0 sm:py-0 px-4">

                <Link href="/aboutus" >
                  <a className={`${currentPage == "about" ? 'text-secondaryColor font-bold' : ''} hover:md:text-secondaryColor block py-3 md:px-3 md:p-0`}>
                    <div className="flex items-center">
                      <span className="sm:hidden block w-[11%]"><Image src={About} alt="about" /></span>
                      <span className={`md:ml-0 ml-2 ${currentPage == "about" ? 'active' : ''}`}>{t('Navbar.Aboutus')}</span>
                    </div>
                  </a>
                </Link>

                <Link href="/compare-tractors" >
                  <a className={`${currentPage == "compare" ? 'text-secondaryColor font-bold' : ''} hover:md:text-secondaryColor block py-3 md:px-3 md:p-0`}>
                    <div className="flex items-center">
                      <span className="sm:hidden block w-[11%]"><Image src={Compare} alt="compare" /></span>
                      <span className={`md:ml-0 ml-2 ${currentPage == "compare" ? 'active' : ''}`}>{t('Navbar.Compare')}</span>
                    </div>
                  </a>
                </Link>

                <Link href="/sell-tractor">
                  <a className={`${currentPage == "sellTractor" ? 'text-secondaryColor font-bold' : ''} sm:hidden hover:md:text-secondaryColor block py-3 md:px-3 md:p-0`}>
                    <div className="flex items-center">
                      <span className="sm:hidden block w-[11%]"><Image src={sellatractor} alt="location" /></span>
                      <span className={`md:ml-0 ml-2 ${currentPage == "sellTractor" ? 'active' : ''}`}>{t('Navbar.SellTractor')}</span>
                    </div>
                  </a>
                </Link>

                <Link href="/dealer-locator" >
                  <a className={`${currentPage == "dealerLocator" ? 'text-secondaryColor font-bold' : ''} hover:md:text-secondaryColor block py-3 md:px-3 md:p-0`}>
                    <div className="flex items-center">
                      <span className="sm:hidden block w-[11%]"><Image src={Location} alt="location" /></span>
                      <span className={`md:ml-0 ml-2 ${currentPage == "dealerLocator" ? 'active' : ''}`}>{t('Navbar.LocateDealer')}</span>
                    </div>
                  </a>
                </Link>

                <Link href="/loan" >
                  <a className={`${currentPage == "loan" ? 'text-secondaryColor font-bold' : ''} hover:md:text-secondaryColor block py-3 md:px-3 md:p-0`}>
                    <div className="flex items-center">
                      <span className="sm:hidden block w-[11%]"><Image src={Loan} alt="loan" /></span>
                      <span className={`md:ml-0 ml-2 ${currentPage == "loan" ? 'active' : ''}`}>{t('Navbar.Loan')}</span>
                    </div>
                  </a>
                </Link>

                <Link href="/content-gallery" >
                  <a className={`${currentPage == "contentGallery" ? 'text-secondaryColor font-bold' : ''} hover:md:text-secondaryColor block py-3 md:px-3 md:p-0`}>
                    <div className="flex items-center">
                      <span className="sm:hidden block w-[11%]"><Image src={ContentGallery} alt="ContentGallery" /></span>
                      <span className={`md:ml-0 ml-2 ${currentPage == "contentGallery" ? 'active' : ''}`}>{t('Navbar.ContentGallery')}</span>
                    </div>
                  </a>
                </Link>



                <Link href="/contact-us">
                  <a className={`${currentPage == "contact" ? 'text-secondaryColor font-bold' : ''} hover:md:text-secondaryColor block py-3 md:px-3 md:p-0`}>
                    <div className="flex items-center">
                      <span className="sm:hidden block w-[11%]"><Image src={Contact} alt="Contact-image" /></span>
                      <span className={`md:ml-0 ml-2 ${currentPage == "contact" ? 'active' : ''}`}>{t('Navbar.Contactus')}</span>
                    </div>
                  </a>
                </Link>




                <li className="sm:block hidden" onClick={onClick}>
                  <div className="flex items-center relative top-[.15rem]">
                    <Image src={NavbarSearch} className="cursor-pointer" alt="NavbarSearch"
                      width={45} height={45} />
                  </div>
                </li>

                <Link href="/sell-tractor">
                  <li className="sm:block hidden">
                    <div className="items-center flex bg-secondaryColor px-6 py-[0.3rem] text-white 
                   border-gradient xl:text-base lg:text-sm cursor-pointer
                  sm:text-xs text-sm">


                      <a>{t('Navbar.Sell')}</a>

                    </div>
                  </li>
                </Link>
              </ul>

              <div className="sm:hidden block mt-3 px-4 ">
                <hr className="border-[#EFEAEA]"></hr>
                <div className="pt-3">
                  {/* <div className="">Toll Free Number</div> */}

                  <div className="flex items-center mb-1">
                    <span className="text-[15px] text-secondaryColor">{t('Footer.Tool_Free_Number')}</span>
                  </div>

                  <div className="flex items-center mb-1">
                    <span className="w-[5%]">
                      <Image src={Contact} alt="Contact-image" width={14} height={14} />
                    </span>
                    <span className="text-[.84rem] ml-2 block">
                      <Link href="tel:18006669999">
                        {t('Footer.Number')}</Link></span>
                  </div>

                </div>
              </div>

              <div className="sm:hidden block mt-3 px-4 ">
                <hr className="border-[#EFEAEA]"></hr>
                <p className="my-3 text-[0.84rem">{t('Navbar.Social_Media')}</p>
                <div className="my-4 flex gap-2">
                  <Image src={Facebook} alt="facebook" width={45} height={45} />
                  <Image src={Xpath} alt="xpath" width={45} height={45} />
                  <Image src={Indeed} alt="indeed" width={45} height={45} />
                  <Image src={Instagram} alt="instagram" width={45} height={45} />
                </div>
              </div>

              <div className="sm:hidden block">
                <Image src={EndTractor} layout="responsive"
                  className="w-full relative bottom-0 left-0" alt="sidebarFooterImage" />
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>

    // <div className="navbar bg-primaryColor text-white">
    //   <div className="flex-1">
    //     <a className="btn btn-ghost text-xl">Tractor World</a>
    //   </div>
    //   <div className="flex-none">
    //     <ul className="menu menu-horizontal px-1">

    //       <li>
    //         <details>
    //           <summary>
    //             Language
    //           </summary>
    //           <ul className="p-2 bg-primaryColor text-white rounded-t-none">
    //               {locales.map((locale) => {
    //               return (
    //               <li key={locale}> 
    //               <Link href={asPath} locale={locale}>
    //               <a className="text-white">{locale.toUpperCase()}</a>
    //               </Link>
    //               </li>
    //               );
    //               })}
    //           </ul>
    //         </details>
    //       </li>
    //     </ul>
    //   </div>
    // </div> 
  );
}