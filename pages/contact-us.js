import React from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Heading from "../components/Heading";
import Image from "next/image";
import CallImg from "@Images/contactus/callimg.svg";
import Mail from "@Images/contactus/mail.svg";
import Facebook from "@Images/contactus/facebook.svg";
import Twitter from "@Images/contactus/twitter.svg";
import Instagram from "@Images/contactus/instagram.svg";
import bannerImg from "@Images/contactus/contactus-banner.svg";
import Link from "next/link";
//import { getLocaleProps } from "@helpers";
import { useTranslation } from "next-i18next";

// export async function getServerSideProps(context) {
//   return await getLocaleProps(context);
// }


export default function ContactUs() {
  const { t, i18n } = useTranslation('common');
  const breadcrumbData = [
    { label: t('Home.Home'), link: "/" },
    { label: t('Navbar.Contactus'), link: "#" },
  ];
  return (
    <div>
      <Layout currentPage={"contact"}>
        <Banner
          breadcrumbs={breadcrumbData}
          heading={t('Navbar.Contactus')}
          bannerImg={bannerImg}
        // BannerUnderlineImg={}
        />
        <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
          <Heading heading="Contact Us" />
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:space-x-6">
              <div className="w-full lg:w-1/2 flex flex-col space-y-2">
                <p className="text-[#7D8F99]">
                  {t('Contact.About_Requirement')}
                </p>

                <Link href="tel:9553353077">
                  <div className="flex space-x-2 float-left cursor-pointer">
                    <div className="w-[3%]">
                      <Image src={CallImg} alt="CallImg" />
                    </div>
                    <p className="text-gray-700">{t('Contact.Contact_No')}</p>
                  </div>
                </Link>

                <Link href="mailto:tractorworld.in">
                  <div className="flex space-x-2 float-left cursor-pointer">
                    <div className="w-[3%]">
                      <Image src={Mail} alt="Mail" />
                    </div>
                    <p className="text-gray-700">{t('Contact.Tactor_In')}</p>
                  </div>
                </Link>

                <div className="flex items-center">
                  <div className="cursor-pointer">
                    <Image src={Facebook} alt="Facebook" />
                  </div>

                  <div className="cursor-pointer">
                    <Image src={Twitter} alt="Twitter" />
                  </div>

                  <div className="cursor-pointer">
                    <Image src={Instagram} alt="Instagram" />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 sm:mt-8 lg:mt-0">
                <form className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 text-[15px]">
                      {t('Loan.Name')}
                    </label>
                    <input
                      placeholder={t('Loan.Enter_Name')}
                      id="name"
                      type="text"
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 text-[15px]">
                      {t('Contact.Email_Id')}
                    </label>
                    <input
                      placeholder={t('Contact.Enter_Email')}
                      id="email"
                      type="email"
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-2 text-[15px]">
                      {t('Loan.Mobile_No')}
                    </label>
                    <input
                      placeholder={t('Loan.Enter_Mobile_NO')}
                      id="phone"
                      type="phone"
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="message" className="mb-2 text-[15px]">
                      {t('Contact.Message')}
                    </label>
                    <textarea
                      placeholder={t('Contact.Your_Message')}
                      id="message"
                      className="rounded-md border border-gray-300 px-3 py-2 resize-none h-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <button
                      type="submit"
                      className="text-white bg-secondaryColor 
                      focus:ring-4 focus:outline-none 
                      font-semibold px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      {t('Contact.Submit_Request')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
