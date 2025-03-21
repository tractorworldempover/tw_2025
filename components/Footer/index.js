import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Time from '@Images/footer/time.png';
import Support from '@Images/footer/support.png';
import Mail from '@Images/footer/mail.png';
import Facebook from '@Images/footer/facebook.svg';
import Twitter from '@Images/footer/twitter.svg';
import Linkdin from '@Images/footer/linkdin.svg';
import Instagram from '@Images/footer/instagram.svg';
import Youtube from '@Images/footer/youtube.svg';
import Location from '@Images/footer/location.png';
import Enquiry from '@Images/footer/enquiry.png';
import Call from '@Images/footer/call.png';
import Logo from '@Images/navbar/logo.svg';
import GoTop from '@Images/footer/top.svg';
import MblLogo from '@Images/footer/mblLogo.svg';
import { useTranslation } from "next-i18next";


export default function Footer() {
    const { locale: activeLocale, locales, asPath } = useRouter();
    const { t, i18n } = useTranslation('common');
    const [showButton, setShowButton] = useState(false);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    // Add scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="relative mb-[-10px] z-[10]">
                <div className="bg-primaryColor xl:w-[33%] lg:w-[40%] md:w-[45%] sm:w-[55%] w-[95%] mx-auto mb-[-10px] 
        relative sm:px-8 px-4 py-4 rounded-md text-white sm:text-sm text-xs flex justify-between">
                    <Link href='./dealers' legacyBehavior>
                        <a className="flex items-center">
                            <Image src={Location} className="mt-4" alt="location" />
                            <span className="ml-2">{t('Footer.Find_a_Dealer')}</span>
                        </a>
                    </Link>
                    <div className="border-r"></div>
                    <Link href='./contact-us' legacyBehavior>
                        <a className="flex items-center">
                            <Image src={Enquiry} className="mt-4" alt="enquiry" />
                            <span className="ml-2">{t('Footer.Make_an_Enquiry')}</span>
                        </a>
                    </Link>
                    <div className="border-r"></div>
                    <div className="flex items-center">
                        <Image src={Call} className="mt-4" alt="call-image" />
                        <span className="ml-2"><Link href="tel:18006669999">{t('Footer.Call_Us_Now')}</Link></span>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-secondaryColor text-white mx-auto sm:pt-6 pt-8 pb-4"
                style={{
                    backgroundImage: `url('/images/footer/footerBanner.svg')`,
                    backgroundPosition: 'right',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <div className="lg:px-14 md:px-6 sm:px-3 px-2 grid gap-2 sm:grid-cols-3 grid-cols-2">

                    <div className="sm:block hidden">
                        <Link href='./' ><a><Image src={Logo} alt="logo" /></a></Link>
                        <p className="text-sm py-1">{t('Footer.@_2024_Tractor')}</p>
                        <p className="text-sm py-1">{t('Footer.Advertise_With_Us')}</p>

                        <div className="mt-3 flex gap-3">
                            <Image src={Facebook} className="cursor-pointer" alt="facebook" />
                            <Image src={Twitter} className="cursor-pointer" alt="facebook" />
                            <Image src={Linkdin} className="cursor-pointer" alt="linkdin" />
                            <Image src={Instagram} className="cursor-pointer" alt="instagram" />
                            <Image src={Youtube} className="cursor-pointer" alt="youtube" />
                        </div>
                    </div>

                    <div>
                        <span className="uppercase font-semibold md:text-lg
                         footerList-border md:after:top-[1.7rem] sm:after:top-[1.4rem] 
                         after:top-[1.3rem] md:before:top-[1.7rem] sm:before:top-[1.4rem] 
                         before:top-[1.3rem] text-base"> {t('Footer.Useful_Links')}</span>
                        <ul className="mt-5 sm:text-[14px]  text-[12px] list-disc ml-3">
                            <Link href="/aboutus"><li className="mb-3 cursor-pointer"> {t('Footer.About_Us')}</li></Link>
                            <Link href="/content-hub"><li className="mb-3 cursor-pointer"> {t('Footer.Latest_News')}</li></Link>
                            {/* <Link href="/exclusive-offers"><li className="mb-3 cursor-pointer"> Offers</li></Link> */}
                            <Link href="/inventory"><li className="mb-3 cursor-pointer"> {t('Footer.Live_Inventory')}</li></Link>
                            <li className="mb-3 cursor-pointer"> {t('Footer.Terms_and_Conditions')}</li>
                        </ul>

                    </div>

                    <div>
                        <span className="uppercase font-semibold md:text-lg 
                        footerList-border md:after:top-[1.7rem] sm:after:top-[1.4rem] 
                        after:top-[1.3rem] md:before:top-[1.7rem] sm:before:top-[1.4rem]
                        before:top-[1.3rem] text-base">{t('Footer.Get_In_Touch')}</span>
                        <div className="mt-5 sm:text-[14px] text-[12px]">
                            <div className="mb-2 flex items-center gap-3
                             border-opacity-[15%] pb-2">
                                <div>
                                    <Image src={Support} alt="support" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="mb-1  text-white opacity-60">{t('Footer.Tool_Free_Number')}</span>
                                    <Link href="tel:18006669999">{t('Footer.Number')}</Link>
                                </div>
                            </div>

                            <div className="mb-2 flex items-center gap-3
                             border-opacity-[15%] pb-2">
                                <div>
                                    <Image src={Time} alt="Time" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="mb-1 text-white opacity-60">{t('Footer.Office_Hours')}</span>
                                    <span>{t('Footer.Office_Time')}</span>
                                </div>
                            </div>

                            <div className="mb-2 flex items-center gap-3">
                                <div>
                                    <Image src={Mail} alt="mail" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="mb-1 text-white opacity-60">{t('Footer.Send_Us_Email')}</span>
                                    <Link href="mailto:tractorworld@domain.net">{t('Footer.Email')}</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="sm:hidden block">
                    <div className="mt-3 flex gap-3 lg:px-14 md:px-6 sm:px-3 px-2 ">
                        <Image src={Facebook} alt="facebook" />
                        <Image src={Twitter} alt="facebook" />
                        <Image src={Linkdin} alt="linkdin" />
                        <Image src={Instagram} alt="instagram" />
                        <Image src={Youtube} alt="youtube" />
                    </div>
                    <hr className="my-6 border-white border-opacity-10"></hr>
                    <div className="lg:px-14 md:px-6 sm:px-3 px-2 flex gap-3 sm:items-start items-center">
                        <Link href='./'><a><Image src={MblLogo} alt="MblLogo" width={40} height={40} /></a></Link>
                        <div>
                            <p className="text-sm py-1 select-none">{t('Footer.@_2024_Tractor')}</p>
                            <p className="text-sm py-1 select-none">{t('Footer.Advertise_With_Us')}</p>
                        </div>
                    </div>
                </div>

                <div className={`absolute sm:right-10 right-2 bottom-0 cursor-pointer ${showButton ? 'block' : 'hidden'}`}>
                    <Image src={GoTop} alt="GoTop" width={40} onClick={scrollToTop} className="" />
                </div>
            </div >
        </>

    );
}