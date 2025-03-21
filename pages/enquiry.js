import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Image from "next/image";
import BannerStrip from "@components/BannerStrip";
import bannerImg from '@Images/home/enquiryBanner.svg';
import CallIcon from '@Images/callIcon.svg';
import enquirywebBanner from '@Images/home/enquirywebBanner.svg';
import WhyChoose from '@Images/home/whyChoose.svg';
import Link from "next/link";
//import { getLocaleProps } from "@helpers";
import { useTranslation } from "next-i18next";

// export async function getServerSideProps(context) {
//     return await getLocaleProps(context);
// }


export default function Enquiry() {
    const { t, i18n } = useTranslation('common');
    const breadcrumbData = [
        { label: t('Home.Home'), link: "/" },
        { label: t('Home.Enquiry'), link: "#" },
    ];

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            // alert(isMobile)// Adjust the breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]); // Empty dependency array ensures useEffect runs only once after initial render


    const handleApplyNow = (event) => {
        event.preventDefault();

        const formElement = document.getElementById("applyForm");
        if (formElement instanceof HTMLFormElement) {
            const inputs = formElement.querySelectorAll("input");
            let formIsValid = true;
            inputs.forEach((input) => {
                if (!input.value.trim()) {
                    formIsValid = false;
                    input.classList.add("error");
                } else {
                    input.classList.remove("error");
                }
            });

            if (formIsValid) {
                formElement.reset();
                alert("Successfully applied for loan!");
            } else {
                alert("Please fill all required fields.");
            }
        } else {
            console.error("Form element not found or invalid type.");
        }
    };

    return (

        <Layout currentPage={'enquiry'}>
            <div>
                <Banner
                    breadcrumbs={breadcrumbData}
                    heading={""}
                    bannerImg={isMobile ? bannerImg : enquirywebBanner}
                    BannerUnderlineImg={false}
                    text={t('Enquiry.Implement_Prices')}
                />
                <div className="bg-white"></div>
                <BannerStrip
                    isEnquiry={true}
                    heading={t('Enquiry.Share_Your_Details')}
                    content={
                        <>
                            <div>
                                <form id="applyForm" onSubmit={handleApplyNow}>
                                    <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-x-20 sm:gap-y-6 gap-4 mt-4 items-end">


                                        <div className="w-full">
                                            <label htmlFor="name" className="block mb-2">
                                                {t('Loan.Name')}
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="bg-white border 
                      border-gray-300 text-black rounded-md block w-full 
                        p-2.5 dark:bg-gray-700 dark:border-gray-600 
                       dark:placeholder-gray-400 dark:text-white"
                                                placeholder={t('Loan.Enter_Name')}
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label htmlFor="number" className="block mb-2">
                                                {t('Loan.Mobile_No')}
                                            </label>
                                            <input
                                                type="number"
                                                id="name"
                                                className="bg-white border 
                      border-gray-300 text-black rounded-md block w-full 
                        p-2.5 dark:bg-gray-700 dark:border-gray-600 
                       dark:placeholder-gray-400 dark:text-white"
                                                placeholder={t('Loan.Enter_Mobile_NO')}
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label htmlFor="location" className="block mb-2">
                                                {t('Enquiry.Select_Budget')}
                                            </label>
                                            <select
                                                id="location"
                                                className="bg-white border border-gray-300
                                      text-black rounded-md  block w-full 
                                        p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                     dark:placeholder-gray-400 dark:text-white"
                                            >
                                                <option value="">{t('Enquiry.Select_Budget')}</option>
                                                <option value="0_3">0 Lakh - 3 Lakh</option>
                                                <option value="3_5">3 Lakh - 5 Lakh</option>
                                                <option value="5_7">5 Lakh - 7 Lakh</option>
                                                <option value="7_10">7 Lakh - 10 Lakh</option>
                                                <option value=">10">Above 10 Lakh</option>
                                            </select>
                                        </div>


                                        <div className="w-full">
                                            <label className="form-label">{t('Dealer.State')}</label>
                                            <select className="block w-full px-2 py-[7px] border 
                    border-gray-300 rounded-md text-[14px] text-[#B9B9B9] mt-2">
                                                <option selected>{t('Dealer.Select_State')}</option>
                                                <option value="madhyaPradesh">Madhya Pradesh</option>
                                                <option value="maharashtra">Maharashtra</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <label className="form-label">{t('Dealer.District')}</label>
                                            <select className="block w-full px-2 py-[7px] 
                     border border-gray-300 rounded-md  text-[14px] text-[#B9B9B9] mt-2">
                                                <option selected>{t('Dealer.Select_District')}</option>
                                                <option value="bhopal">Bhopal</option>
                                                <option value="alirajpur">Alirajpur</option>
                                                <option value="barwani">Barwani</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <label className="form-label">{t('Dealer.Tehsil_or_Taluka')}</label>
                                            <select className="block w-full px-2 py-[7px] border border-gray-300 
                    rounded-md text-[14px] text-[#B9B9B9] mt-2">
                                                <option value="" selected>{t('Dealer.Select_Taluka')}</option>
                                                <option value="Berasia">Berasia</option>
                                                <option value="Huzur">Huzur</option>
                                            </select>
                                        </div>



                                    </div>


                                    <div className="w-full flex gap-2 mt-6">
                                        <input type="checkbox" className="mt-1" />
                                        <label htmlFor="location" className="block mb-2 mt-0">
                                            {t('Enquiry.I_Agree')}
                                        </label>
                                    </div>


                                    <div className="w-full flex justify-center mt-6">
                                        <button type="submit"
                                            className="bg-secondaryColor px-2 py-3 text-white 
                        text-center rounded-md sm:w-1/2 w-full font-semibold cursor-pointer"
                                        >
                                            {t('Enquiry.Get_Price')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    }
                />
            </div>

            <div className="bg-white pb-6 lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 my-3 sm:h-auto h-24">
                <div className="relative px-4 sm:flex justify-center">
                    <div>
                        <div className="flex gap-4 items-center">
                            <Image src={CallIcon} alt="phone" width={40} height={40} />
                            <p className="text-medium">{t('Enquiry.More_Info')}<br></br>
                                {t('Enquiry.On_Call')}</p>
                        </div>
                        <p className="text-primaryColor">{t('Enquiry.24*7 ')}<Link href="tel:18006669999">{t('Footer.Number')}</Link></p>

                    </div>
                    <div className="sm:relative absolute sm:right-[67px] right-[-4px] top-[-8px] sm:w-[200px] w-[160px]">
                        <Image src={WhyChoose} alt="whyChoose" layout="responsive" />
                    </div>
                </div>

            </div>
        </Layout>
    );
}
