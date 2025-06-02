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
import { getLocaleProps } from "@helpers";
import { useTranslation } from "next-i18next";
import {
  fetchLocations,
  getDealersData,
  getFilteredDistricts,
} from "../../utils";
import Head from "next/head";
import { staticMetaByRoute } from "../../utils";


export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}

export default function SellTractor() {
  const { t, i18n } = useTranslation("common");
  const [isExpanded, setIsExpanded] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [locations, setLocations] = useState({});
  const dealerRightData = getDealersData();
  const meta = staticMetaByRoute["/sell-tractor"];

  // Form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    state: "",
    district: "",
    leadType: "sell",
  });
  const [error, setError] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Validation function
  const validate = () => {
    let errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      errs.phone = "Enter a valid 10-digit phone number";
    }
    if (!selectedState) errs.state = "Please select a state";
    if (!selectedDistrict) errs.district = "Please select a district";
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
          const res = await fetch('https://mazutwmwpbackend002.azurewebsites.net/wp-json/custom/v1/contact', { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Thank you! Your message has been sent.");
        setForm({
          name: "",
          phone: "",
          state: "",
          district: "",
          leadType: "sell",
        });
        setError({});
        setSelectedState("");
        setSelectedDistrict("");
      } else {
        setSuccessMsg(t("submission_error"));
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSuccessMsg(t("submission_error"));
    }
  };

  useEffect(() => {
    fetchLocations(setLocations, setStates);
  }, []);

  const handleStateChange = (event) => {
    const selected = event.target.value;
    setSelectedState(selected);
    setForm((prevForm) => ({ ...prevForm, state: selected })); // Add this line
    const filteredDistricts = getFilteredDistricts(locations, selected);
    console.log("Filtered Districts:", filteredDistricts);
    setDistricts(filteredDistricts);
    setSelectedDistrict("");
    setForm((prevForm) => ({ ...prevForm, district: "" })); // Reset district in form
  };

  const handleDistrictChange = (event) => {
    const selected = event.target.value;
    setSelectedDistrict(selected);
    setForm((prevForm) => ({ ...prevForm, district: selected })); // Add this line
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const breadcrumbData = [
    { label: t("Home.Home"), link: "/" },
    { label: t("Navbar.SellTractor"), link: "#" },
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
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
    <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
    <div>
      <Layout currentPage={"sellTractor"}>
        <Banner
          breadcrumbs={breadcrumbData}
          heading={""}
          bannerImg={!isMobile ? bannerImg : mblBannerImg}
          BannerUnderlineImg={false}
        />

        <BannerStrip
          heading={t("SellTractor.Heading")}
          content={
            <>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex sm:flex-row flex-col gap-4 mt-4 items-center">
                    <div className="sm:w-1/4 w-full">
                      <label htmlFor="name" className="block mb-2">
                        {t("Loan.Name")}
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className="bg-white border border-gray-300 text-black rounded-md block w-full 
                        p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder={t("Loan.Enter_Name")}
                      />
                      {error.name && (
                        <span className="text-red-500 text-sm">
                          {error.name}
                        </span>
                      )}
                    </div>

                    <div className="sm:w-1/4 w-full">
                      <label htmlFor="number" className="block mb-2">
                        {t("Loan.Mobile_No")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="bg-white border 
                      border-gray-300 text-black rounded-md block w-full 
                        p-2.5 dark:bg-gray-700 dark:border-gray-600 
                       dark:placeholder-gray-400 dark:text-white"
                        placeholder={t("Loan.Enter_Mobile_NO")}
                      />
                      {error.phone && (
                        <span className="text-red-500 text-sm">
                          {error.phone}
                        </span>
                      )}
                    </div>

                    <div className="sm:w-1/4 w-full">
                      <label className="block mb-2">{t("Dealer.State")}</label>
                      <select
                        className="bg-white border 
                      border-gray-300 text-black rounded-md block w-full 
                        p-2.5 dark:bg-gray-700 dark:border-gray-600 
                       dark:placeholder-gray-400 dark:text-white"
                        onChange={handleStateChange}
                        value={form.state}
                      >
                        <option value="">{t("Dealer.Select_State")}</option>
                        {states.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {error.state && (
                        <span className="text-red-500 text-sm">
                          {error.state}
                        </span>
                      )}
                    </div>

                    <div className="sm:w-1/4 w-full">
                      <label className="block mb-2">
                        {t("Dealer.District")}
                      </label>
                      <select
                        className="bg-white border border-gray-300 text-black rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        onChange={handleDistrictChange}
                        value={form.district}
                      >
                        <option value="">{t("Dealer.Select_District")}</option>
                        {districts.map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      {error.district && (
                        <span className="text-red-500 text-sm">
                          {error.district}
                        </span>
                      )}
                    </div>

                    {/* <div className="sm:w-1/4 w-full">
                      <label className="block mb-2">{t('Dealer.Tehsil_or_Taluka')}</label>
                      <select className="bg-white border border-gray-300 text-black rounded-md block w-full p-2.5 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                        <option value="" selected>{t('Dealer.Select_Taluka')}</option>
                        <option value="Berasia">Berasia</option>
                        <option value="Huzur">Huzur</option>
                      </select>
                    </div> */}
                    

                    <div className="sm:w-1/4 w-full mt-4">
                      <button
                        type="submit"
                        className="bg-secondaryColor px-2 py-3 text-white 
                        text-center rounded-md font-semibold cursor-pointer"
                      >
                        {t("SellTractor.Sell_Now")}
                      </button>
                    </div>
                  </div>
                </form>

                {successMsg && <p className="text-green-600 font-semibold mt-4 text-center">{successMsg}</p>}

              </div>
            </>
          }
        />

        <div className="bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
          <Heading heading={t("SellTractor.Why_Tractor_world")} />

          <div className="">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex-none md:flex-initial w-full md:w-auto card bg-[#F6F6F6] py-4"
                >
                  <div className="grid items-center justify-center gap-2">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      className="max-w-full h-auto"
                    />
                    <span className="text-base font-semibold text-center">
                      {feature.title}
                    </span>
                    <span className="text-base">{feature.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-2 md:bg-transparent">
          <Heading heading={t("SellTractor.Tractor_World_is_best_place")} />
          {/* <div BannerUnderlineImg={true}> */}
          <div className="sm:text-base text-[13px]">
            <p className="my-1 font-bold text-black">
              {t("SellTractor.Thinking_to_upgrade")}
            </p>

            <p className="my-1 font-bold text-black">
              {t("SellTractor.Waiting_for_bestOffres")}
            </p>

            <p className="my-1 font-bold text-black">
              {t("SellTractor.Have_an_used_tractor")}
            </p>
          </div>
          <p className="sm:text-medium text-[13px] my-2">
            {/* dynamic read more */}
            {/*{isExpanded ? item.description : `${item.description.slice(0, 250)}...`}*/}
            {/*end dynamic read more */}
            {t("SellTractor.Why_Tractor_world_info1")}
            {isExpanded && <>{t("SellTractor.Why_Tractor_world_info2")}</>}
            <span
              className="text-[#407BD2] sm:uppercase text-sm cursor-pointer"
              onClick={toggleReadMore}
            >
              {isExpanded
                ? t("SellTractor.Read_less") + " »"
                : t("SellTractor.Read_more") + " »"}
            </span>
          </p>
        </div>
      </Layout>
    </div>
    </>
  );
}
