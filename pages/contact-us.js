import { useMutation } from "@apollo/client";
import React, { useState,useEffect } from "react";
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
import { getLocaleProps } from "@helpers";
import { useTranslation } from "next-i18next"; 
import { getApolloClient } from '@service/apollo-client';
import { SUBMIT_CONTACT } from "@utils/constants";
  

export default function ContactUs() {

  const { t } = useTranslation("common");
  
  // Now that the client is set, use the mutation hook
  const [submitContact, { loading, data }] = useMutation(SUBMIT_CONTACT);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [error, setError] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    let errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Email is invalid";
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      errs.phone = "Enter a valid 10-digit phone number";
    }
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      debugger;
      const response = await submitContact({
        variables: {
          email: form.email,
          leadtype: "Sales Inquiry",
          message: form.message,
          mobile: form.phone,
          title: form.name,
        },
      });

      if (response.data) {
        setSuccessMsg("Thank you! Your message has been sent.");
        setForm({ name: "", email: "", phone: "", message: "" });
        setError({});
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSuccessMsg("Oops! Something went wrong.");
    }
  };

  const breadcrumbData = [
    { label: t("Home.Home"), link: "/" },
    { label: t("Navbar.Contactus"), link: "#" },
  ];

  return (
    <div>
      <Layout currentPage={"contact"}>
        <Banner
          breadcrumbs={breadcrumbData}
          heading={t("Navbar.Contactus")}
          bannerImg={bannerImg}
        />
        <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
          <Heading heading="Contact Us" />
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:space-x-6">
              <div className="w-full lg:w-1/2 flex flex-col space-y-2">
                <p className="text-[#7D8F99]">{t("Contact.About_Requirement")}</p>
                <Link href="tel:9553353077">
                  <div className="flex space-x-2 float-left cursor-pointer">
                    <div className="w-[3%]">
                      <Image src={CallImg} alt="Call" />
                    </div>
                    <p className="text-gray-700">{t("Contact.Contact_No")}</p>
                  </div>
                </Link>

                <Link href="mailto:tractorworld.in">
                  <div className="flex space-x-2 float-left cursor-pointer">
                    <div className="w-[3%]">
                      <Image src={Mail} alt="Mail" />
                    </div>
                    <p className="text-gray-700">{t("Contact.Tactor_In")}</p>
                  </div>
                </Link>

                <div className="flex items-center space-x-4 mt-4">
                  <Image src={Facebook} alt="Facebook" className="cursor-pointer" />
                  <Image src={Twitter} alt="Twitter" className="cursor-pointer" />
                  <Image src={Instagram} alt="Instagram" className="cursor-pointer" />
                </div>
              </div>

              <div className="w-full lg:w-1/2 sm:mt-8 lg:mt-0">
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 text-[15px]">
                      {t("Loan.Name")}
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("Loan.Enter_Name")}
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {error.name && <span className="text-red-500 text-sm">{error.name}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 text-[15px]">
                      {t("Contact.Email_Id")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("Contact.Enter_Email")}
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-2 text-[15px]">
                      {t("Loan.Mobile_No")}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t("Loan.Enter_Mobile_NO")}
                      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {error.phone && <span className="text-red-500 text-sm">{error.phone}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="message" className="mb-2 text-[15px]">
                      {t("Contact.Message")}
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t("Contact.Your_Message")}
                      className="rounded-md border border-gray-300 px-3 py-2 resize-none h-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    ></textarea>
                    {error.message && <span className="text-red-500 text-sm">{error.message}</span>}
                  </div>

                  {successMsg && <p className="text-green-600 font-semibold">{successMsg}</p>}

                  <div className="flex flex-col sm:flex-row">
                    <button
                      type="submit"
                      className="text-white bg-secondaryColor focus:ring-4 focus:outline-none font-semibold px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      {t("Contact.Submit_Request")}
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
