import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Call from '@Images//topbar/phn.svg';
import Mail from '@Images/topbar/mail.svg';
import Location from '@Images/topbar/location.svg';
import Language from '@Images/topbar/language.svg';
import Headerinstagram from '@Images/topbar/instagram.svg';
import Headerfacebook from '@Images/topbar/facebook.svg';
import Twitter from '@Images/topbar/twitter.svg';
import Ball from '@Images/topbar/ball.svg';
import { useTranslation } from 'next-i18next';

export default function Topbar() {

    const { locale: activeLocale, locales, asPath } = useRouter(); 
    const { t, i18n } = useTranslation(); 

    const handleLocaleChange = (locale) => {
        i18n.changeLanguage(locale); 
    };
 
    const localeNames = {
        en: 'English',
        hi: 'Hindi',
        mr: 'Marathi',
        // Add more locale codes and their corresponding languages as needed
    }; 

    return (
        <>
            <div className="sm:border-0 border-b">
                <div className="mx-auto lg:px-14 md:px-6 sm:px-3 px-2">

                    <ul className="font-medium flex sm:mt-0 flex-row rtl:space-x-reverse items-center 
        xl:text-sm lg:text-[.7rem] sm:text-[.67rem] text-sm">

                        <li className="py-2 md:pr-4 pr-2 sm:border-r flex items-center">
                            <Image src={Call} alt="call" />
                            <span className="sm:inline-flex hidden ml-2">+1-541-754-3010</span>
                        </li>

                        <li className="py-2 md:px-4 px-2 sm:border-r flex items-center">
                            <Image src={Mail} alt="mail" className="" />
                            <span className="sm:inline-flex hidden ml-2">contact@example.com</span>
                        </li>

                        <Link href="#testimonials" >
                        <a className="py-2 sm:inline-flex hidden md:px-4 px-2 border-r">{t('testimonials')} 
                        </a>
                        </Link>

                        <Link href="/tractor-details#compareTractor" >
                        <a className="py-2 sm:inline-flex hidden md:px-4 px-2 border-r">{t('compareTractor')}</a>
                        </Link>

                        <Link href="/dealer-locator"  >
                       <a className="py-2 md:px-4 px-2 md:border-l sm:border-0 border-l 
                        ml-auto text-grayColor flex items-center">
                            <Image src={Location} alt="location" className="" />
                            <span className="ml-2">{t('dealerLocater')}</span>
                            </a>
                        </Link>

                        <div className="relative language-container">
                            <li className="py-2 md:px-4 sm:px-2 pr-0 pl-2 border-l">
                                <div className="flex items-center cursor-pointer">
                                    <Image src={Language} alt="language" className="" />
                                    <span className="ml-2">{localeNames[activeLocale]}</span>
                                    <svg className="lg:w-2.5 lg:h-2.5 md:w-2 md:2 sm:w-2 sm:h-2 w-2.5 h-2.5 md:ms-3 sm:ms-1 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </div>
                            </li>

                            <div
                                id="dropdownInformation"
                                className="absolute z-[9999999] bg-white divide-y divide-gray-100 rounded-lg shadow
              xl:w-32 sm:w-28 w-24  dark:bg-gray-700 dark:divide-gray-600">

                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownInformationButton">
                                    {/* <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600
                     dark:hover:text-white">
                      Dashboard
                    </a>
                  </li> */}

                                    {locales.map((locale) => {
                                        const isSelected = locale === activeLocale; // Check if the locale is currently selected
                                        return (
                                            <li key={locale}>
                                                <Link href={asPath} locale={locale} >
                                                    <a className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${isSelected ? 'font-bold active text-secondaryColor' : ''}`} onClick={() => handleLocaleChange(locale)}>
                                                        {locale?.toUpperCase()}
                                                    </a>
                                                </Link>
                                            </li>
                                        );
                                    })}

                                </ul>

                            </div>

                        </div>

                        <li className="sm:inline-flex items-center hidden py-2 pl-4 border-l text-grayColor">
                            <span className="flex">
                                <Image src={Ball} alt="ball" />
                            </span>

                            <span className="flex ml-4" >
                                <Image src={Headerinstagram} alt="instagram" />
                            </span>

                            <span className="flex ml-4" >
                                <Image src={Headerfacebook} alt="headerfacebook" />
                            </span>

                            <span className="flex ml-4" >
                                <Image src={Twitter} alt="twitter" />
                            </span>
                        </li>

                    </ul>
                </div>
            </div>


        </>

    );
}