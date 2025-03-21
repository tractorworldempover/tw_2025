import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Underline from '@Images/underline.svg';
import { useTranslation } from "next-i18next";


export default function Heading({ heading, viewButton, onClick }) {
    const { locale: activeLocale, locales, asPath } = useRouter();
    const { t, i18n } = useTranslation('common');

    return (
        <>
            <div className="flex sm:flex-nowrap flex-wrap items-center
                 sm:justify-between mx-auto">
                <div className="flex justify-between w-full sm:items-center">
                    <div className="sm:mt-0 mt-2 font-bold xl:text-xl lg:text-lg md:text-base text-xl">
                        <p className="mb-[-5px]">{heading}</p>
                        <Image src={Underline} alt="underline" width={50}/>
                    </div> 
                    {viewButton && (
                    <div>
                        <div className="sm:block hidden cursor-pointer border-secondaryColor border font-semibold
                         text-secondaryColor  items-center xl:text-base lg:text-sm text-sm xl:px-4
                          xl:py-2 lg:px-3 lg:py-[5px] md:px-4 md:py-[5px] sm:py-[5px] sm:px-3 py-1
                           px-3" onClick={onClick}>{t('Home.View_All')}</div>
                    </div>
                    )}
                </div>
            </div> 
        </>

    );
}