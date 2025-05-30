import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Btn from "@components/Btn";
import Image from "next/image";
import Table from "@components/Table";
import Heading from "@components/Heading";
import Tab from "@components/Tab";
import CompareImage from "@Images/liveInventory/compareImage.svg";
import closeIcon from "@Images/closeIcon.svg";
import BannerImg from "@Images/compareTractorImg/Compare_tractor_banner.svg";
import vs from "@Images/compareTractorImg/vs.svg";
import { useRouter } from "next/router";
import { getLocaleProps } from "@helpers";
import { useTranslation } from "next-i18next";
import {
  calculateEMI,
  formatPrice,
  getHomePageTractorsListBasedOnInventory,
} from "@utils";
import Link from "next/link";
import { useInventory } from "@utils";
import {
  getTractorDetailsById,
  getTabLabel,
  HomeHPRanges,
  getValidImageUrl,
} from "@utils";
import HP from "@Images/hp.svg";
import DefaultTractor from "@Images/default_tractor.svg";
import { metaDetailsById } from "../../utils";
import Head from "next/head";

// export async function getServerSideProps(context) {
//     return await getLocaleProps(context);
// }

export async function getServerSideProps(context) {
  const { id1, id2 } = context.query;

  let tractor1 = null;
  let tractor2 = null;
  let meta1 = null;
  let meta2 = null;

  try {
    const [res1, res2] = await Promise.all([
      fetch(
        `https://used-tractor-backend.azurewebsites.net/inventory/web/v2/tractor/limit-one/${id1}/`
      ),
      fetch(
        `https://used-tractor-backend.azurewebsites.net/inventory/web/v2/tractor/limit-one/${id2}/`
      ),
    ]);

    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

    tractor1 = data1?.data || null;
    tractor2 = data2?.data || null;

    meta1 = tractor1 ? metaDetailsById(tractor1) : null;
    meta2 = tractor2 ? metaDetailsById(tractor2) : null;
  } catch (error) {
    console.error("Error fetching tractor data:", error);
  }

  const localeResult = await getLocaleProps(context, ["common"]);

  return {
    props: {
      ...localeResult.props,
      meta1,
      meta2,
      tractorName1: tractor1 ? `${tractor1.brand} ${tractor1.model}` : "",
      tractorName2: tractor2 ? `${tractor2.brand} ${tractor2.model}` : "",
    },
  };
}

export default function CompareTractorDetails({
  locale,
  meta1,
  meta2,
  tractorName1,
  tractorName2,
}) {
  console.log("TRACTOR NAMES", tractorName1, tractorName2);

  useEffect(() => {
    if (tractorName1 && tractorName2) {
      document.title = `Tractor World | Compare ${tractorName1} vs ${tractorName2}`;
    }
  }, [tractorName1, tractorName2]);


  const { inventory: inventoryData } = useInventory();
  const router = useRouter();
  const { id1, id2 } = router.query;
  const { t, i18n } = useTranslation("common");

  const [brandNames, setBrandNames] = useState([]);
  const breadcrumbData = [
    { label: "Home", link: "/" },
    { label: "Compare Tractor", link: "#" },
  ];

  const [tractorDetails, setTractorDetails] = useState([]);
  const [specifications1, setSpecifications1] = useState([]);
  const [specifications2, setSpecifications2] = useState([]);
  const [wheelsData1, setwheelsData1] = useState([]);
  const [wheelsData2, setwheelsData2] = useState([]);
  const [otherDetailsData1, setotherDetailsData1] = useState([]);
  const [otherDetailsData2, setotherDetailsData2] = useState([]);
  const [steeringData, setSteeringData] = useState([]);
  const [SimilarTractorsListData, setSimilarTractorsListData] = useState([]);

  useEffect(() => {
    const loadTractorImages = async () => {
      if (id1 && id2 && inventoryData.length > 0) {
        const tractor1 = inventoryData.find(
          (tractor) => tractor.tractor_id === Number(id1)
        );
        const tractor2 = inventoryData.find(
          (tractor) => tractor.tractor_id === Number(id2)
        );

        if (tractor1 && tractor2) {
          const [imageUrl1, imageUrl2] = await Promise.all([
            getValidImageUrl(tractor1.image_links, DefaultTractor),
            getValidImageUrl(tractor2.image_links, DefaultTractor),
          ]);

          const imagesData = [
            {
              name: `${tractor1.brand} ${tractor1.model}`,
              emiStartsFrom: calculateEMI(tractor1.max_price),
              price: formatPrice(tractor1.max_price),
              checkPrice: "Check Tractor Price",
              image: imageUrl1,
              tractorId: tractor1.tractor_id,
            },
            {
              name: `${tractor2.brand} ${tractor2.model}`,
              emiStartsFrom: calculateEMI(tractor2.max_price),
              price: formatPrice(tractor2.max_price),
              checkPrice: "Check Tractor Price",
              image: imageUrl2,
              tractorId: tractor1.tractor_id,
            },
          ];

          setTractorDetails(imagesData);
          setBrandNames(imagesData.map((item) => item.name));

          const createTableData = (tractor, fields) =>
            fields.map((field) => ({
              tablData: [{ td: field.label }, { td: `${tractor[field.key]}` }],
            }));

          const specFields = [
            { label: "Engine HP", key: "engine_power" },
            { label: "Engine Hours", key: "engine_hours" },
            { label: "Engine Condition", key: "engine_condition" },
          ];

          const wheelFields = [
            { label: "Tyre Condition", key: "tyre_condition" },
            { label: "Tyre State", key: "tyre_state" },
          ];

          const otherFields = [{ label: "Buying Year", key: "buying_year" }];

          setSpecifications1(createTableData(tractor1, specFields));
          setSpecifications2(createTableData(tractor2, specFields));

          setwheelsData1(createTableData(tractor1, wheelFields));
          setwheelsData2(createTableData(tractor2, wheelFields));

          setotherDetailsData1(createTableData(tractor1, otherFields));
          setotherDetailsData2(createTableData(tractor2, otherFields));
        }
      }
    };
    loadTractorImages();
  }, [id1, id2, inventoryData]);

  const accordionData = [
    {
      id: 1,
      heading: "Engine",
      content: { tractor1data: specifications1, tractor2data: specifications2 },
    },
    {
      id: 2,
      heading: "Wheels And Tires",
      content: { tractor1data: wheelsData1, tractor2data: wheelsData2 },
    },
    {
      id: 3,
      heading: "Other Information",
      content: {
        tractor1data: otherDetailsData1,
        tractor2data: otherDetailsData2,
      },
    },
  ];

  // for accordion
  const [openAccordion, setOpenAccordion] = useState(1);
  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  //similarTractors
  useEffect(() => {
    if (inventoryData.length > 0 && id1 && id2) {
      const tractor1 = inventoryData.find(
        (t) => Number(t.tractor_id) === Number(id1)
      );
      const tractor2 = inventoryData.find(
        (t) => Number(t.tractor_id) === Number(id2)
      );

      if (!tractor1 || !tractor2) {
        console.warn("One or both tractors not found in inventoryData");
        return;
      }

      const enginePower1 = tractor1?.engine_power;
      const enginePower2 = tractor2?.engine_power;

      let filteredSimilarTractors = inventoryData
        .filter(
          (item) =>
            (item.engine_power === enginePower1 ||
              item.engine_power === enginePower2) &&
            item.tractor_id !== Number(id1) &&
            item.tractor_id !== Number(id2)
        )
        .slice(0, 10) // ✅ Limit results to 10 similar tractors
        .map((item) => ({
          title: `${item.brand} ${item.model}`,
          price: item.max_price,
          engineHours: item.engine_hours,
          driveType: item.drive_type,
          enginePower: item.engine_power,
          tractorId: item.tractor_id,
        }));

      setSimilarTractorsListData(filteredSimilarTractors);
      // console.log(JSON.stringify(SimilarTractorsListData) + "SimilarTractorsListData");
    }
  }, [id1, id2, inventoryData]); // ✅ Runs only when these values change

  const compareTractorData = getHomePageTractorsListBasedOnInventory(
    SimilarTractorsListData
  );

  const [activeTab, setActiveTab] = useState("oneData");
  // Automatically highlight the first available tab from compareTractorData
  useEffect(() => {
    const availableTabs = Object.keys(compareTractorData);
    if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]); // Set the first available tab
    }
  }, [compareTractorData]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return tractorName1 && tractorName2 ? (
    <>
      <Head>
        <title>
          {tractorName1 && tractorName2
            ? `Tractor World | Compare ${tractorName1} vs ${tractorName2}`
            : "Tractor World | Compare"}
        </title>

        <meta
          name="description"
          content={`Compare ${tractorName1} and ${tractorName2} on Tractor World. ${
            meta1?.description || ""
          } ${meta2?.description || ""}`}
        />
        <meta
          name="keywords"
          content={`${meta1?.keywords || ""}, ${meta2?.keywords || ""}`}
        />
      </Head>

      <Layout currentPage={"compare"}>
        <Banner
          breadcrumbs={breadcrumbData}
          heading={"Compare Tractor Details"}
          bannerImg={BannerImg}
        />

        <div className="w-full bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3">
          <div className="w-full flex grid-cols-1 sm:flex-row sm:items-start items-center flex-col sm:gap-10 gap-4 justify-between">
            {tractorDetails.map((tractor, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div className="m-auto sm:w-[100px] sm:h-[100px] h-[40px] w-[40px]">
                    <Image src={vs} alt="vs" layout="responsive" />
                  </div>
                )}

                <div className="w-full">
                  <div className="bg-[#FBFBFB] shadow-lg w-full">
                    <div className="relative p-2">
                      <Image
                        src={tractor.image}
                        alt="image"
                        width={301}
                        height={173}
                        layout="responsive"
                      />
                    </div>
                    <div className="p-4 bg-[#FBFBFB]">
                      <h3 className="text-[14px]  text-[#000000]">
                        {tractor.name}
                      </h3>
                      <p className="text-[14px]  text-secondaryColor mt-2">
                        {tractor.emiStartsFrom}
                      </p>
                      <p className="text-[14px] text-[#000000]  mt-2">
                        {tractor.price}
                      </p>
                      <p className="text-[14px] text-primaryColor  mt-2 inline-block cursor-pointer">
                        <Link href="/interested">Enquire</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Accordion */}
          <div
            className="mt-4"
            id="accordion-collapse"
            data-accordion="collapse"
          >
            {accordionData.map((item) => (
              <div key={item.id}>
                <h2
                  id={`accordion-collapse-heading-${item.id}`}
                  className="mt-3"
                >
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-3 font-semibold rtl:text-right border bg-[#EEEEF0] border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={openAccordion === item.id}
                    aria-controls={`accordion-collapse-body-${item.id}`}
                  >
                    <span>{item.heading}</span>
                    <svg
                      data-accordion-icon
                      className={`w-3 h-3 ${
                        openAccordion === item.id ? "rotate-180" : ""
                      } shrink-0`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>

                <div
                  id={`accordion-collapse-body-${item.id}`}
                  className={openAccordion === item.id ? "" : "hidden"}
                  aria-labelledby={`accordion-collapse-heading-${item.id}`}
                >
                  <div className="border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <div className="grid sm:grid-cols-2 sm:gap-20 gap-10 p-4">
                      <div>
                        <p className="mb-2 text-xl font-bold text-primaryColor">
                          {brandNames[0]}
                        </p>
                        <Table data={item.content.tractor1data} />
                      </div>
                      <div>
                        <p className="mb-2 text-xl font-bold text-primaryColor">
                          {brandNames[1]}
                        </p>
                        <Table data={item.content.tractor2data} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="my-4">
            <Heading heading={"Tractors in 2024"} />
          </div>

          <div className="flex sm:gap-4 gap-2 my-3 font-medium relative z-20">
            {HomeHPRanges.map((range) => (
              <Tab
                key={range.key}
                id={range.key}
                activeTab={activeTab}
                onClick={handleTabClick}
              >
                {getTabLabel(range.min, range.max)}
              </Tab>
            ))}
          </div>

          <div>
            <div className="grid sm:grid-cols-3 md:gap-6 gap-4">
              {Object.keys(compareTractorData).map((key) =>
                activeTab === key
                  ? compareTractorData[activeTab]?.slice(0, 3).map((item) => (
                      <div
                        key={`${item.brand1Id}-${item.brand2Id}`}
                        className="overflow-hidden flex-none"
                      >
                        <Image
                          src={CompareImage}
                          alt="compareImage"
                          layout="responsive"
                        />
                        <div className="flex justify-between px-3 mb-3">
                          <div>
                            <div>{item.brand1}</div>
                            <div className="font-semibold my-1">
                              <Image src={HP} width={15} height={15} alt="hp" />{" "}
                              {item.brand1hp}
                            </div>
                            <div className="font-semibold my-1">
                              {formatPrice(item.brand1price)}
                            </div>
                          </div>
                          <div>
                            <div>{item.brand2}</div>
                            <div className="font-semibold my-1">
                              <Image src={HP} width={15} height={15} alt="hp" />{" "}
                              {item.brand2hp}
                            </div>
                            <div className="font-semibold my-1">
                              {formatPrice(item.brand2price)}
                            </div>
                          </div>
                        </div>
                        <Link
                          href={{
                            pathname:
                              "/compare-tractors/compare-tractor-details",
                            query: {
                              t1: item.brand1,
                              t2: item.brand2,
                              id1: item.brand1Id,
                              id2: item.brand2Id,
                            },
                          }}
                          passHref
                        >
                          <Btn className="uppercase" text={t("Home.COMPARE")} />
                        </Link>
                      </div>
                    ))
                  : null
              )}
            </div>
            <div className="flex justify-center my-6">
              <Link href="/compare-tractors">
                <Btn
                  text={t("Home.View_All_Tractor_Comparison")}
                  bgColor={true}
                />
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  ) : null;
}
