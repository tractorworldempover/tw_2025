import React, { useState, useEffect } from "react";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import Head from "next/head";
import Modal from "@components/Modal";
import Image from "next/image";
import Logo from "@Images/navbar/logo.svg";
import MblLogo from "@Images/navbar/mblLogo.svg";
import Btn from "@components/Btn";
import languagePopupImg from "@Images/languagePopup.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useInventory } from "@utils";

const Layout = ({ children, currentPage, locale }) => {
  const [showModal, setShowModal] = useState(false);
  const [languageModalShow, setLanguageModalShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const language = locale?.toUpperCase();
  const { inventory, loading } = useInventory(); // 🆕 pull from session

  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleLanguage = () => {
    setLanguageModalShow(true);
  };

  const handleLanguageModalClose = () => {
    setLanguageModalShow(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter suggestions from inventory based on search term
  useEffect(() => {
    // console.log("Search term:", searchTerm);
    // console.log("Inventory sample:", inventory[0]); // Inspecting the structure
    if (!searchTerm) {
      setBrands([]);
    } else if (inventory && inventory.length > 0) {
      const filtered = inventory
        .filter(item =>
          `${item.brand} ${item.model}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 10)
        .map(item => {
          const title = `${item.brand} ${item.model}`;
          return {
            title,
            slug: `/tractor-details/${item.tractor_id}-${title.replace(/\s+/g, "-").toLowerCase()}`
          };
        });

      setBrands(filtered);
    }
  }, [searchTerm, inventory]);


  const customStyles = {
    content: {
      top: "0",
      left: "auto",
      right: "auto",
      bottom: "auto",
      width: "100%",
      borderBottomLeftRadius: "15px",
      borderBottomRightRadius: "15px",
    },
  };

  const languageMap = [
    { label: "English", value: "en" },
    { label: "Hindi", value: "hi" },
    { label: "Marathi", value: "mr" },
  ];

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = () => {
    const newLocale = selectedLanguage;
    i18n.changeLanguage(newLocale);
    router.push(router.asPath, router.asPath, { locale: newLocale });
    setLanguageModalShow(false);
  };

  return (
    <>

      <Head>
        <title>{t("Navbar.title")}</title>
        <meta name="author" content="Corteva" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      </Head>

      <div className="header">
        <NavBar
          currentPage={currentPage}
          onClick={handleShow}
          onClickForLanguage={handleLanguage}
        />
      </div>
      <div className="main">
        <main>
          {children}
          <Modal
            customStyles={customStyles}
            showModal={showModal}
            handleClose={handleClose}
            content={
              <>
                <div className="sm:block hidden">
                  <Image
                    src={Logo}
                    alt="Tractor World Logo"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="sm:hidden block mt-2 ml-3">
                  <Image
                    src={MblLogo}
                    alt="Tractor World Logo"
                    width={50}
                    height={50}
                  />
                </div>

                <div className="px-4 sm:py-10 pt-4 pb-8">
                  <div className="w-full flex justify-center">
                    <div className="flex flex-col gap-2 text-lg">
                      <p className="font-semibold">
                        {t("Navbar.What_are_you_looking_for")}
                      </p>
                      <div className="border-b-2 border-[#e6e6e6]">
                        <input
                          type="text"
                          placeholder={t("Navbar.Start_typing")}
                          onChange={handleSearchChange}
                          className="border-b-0 border-t-0 border-l-0 border-r-0"
                        />
                      </div>

                      {/* {console.log(
                        "DEBUG → loading:",
                        loading,
                        "| searchTerm:",
                        searchTerm,
                        "| brands:",
                        brands
                      )} */}

                      {loading ? (
                        <div className="loading">Loading...</div>
                      ) : searchTerm && brands.length > 0 ? (
                        <ul className="brand-list">
                          <p className="text-[#F37021] mb-1 font-bold text-[15px]">
                            Popular Searches
                          </p>
                          {brands.map((brand, index) => (
                            <li
                              key={index}
                              onClick={() => router.push(brand.slug)}
                              className="brand-item text-[15px] p-1 cursor-pointer hover:underline"
                            >
                              {brand.title}
                            </li>
                          ))}
                        </ul>
                      ) : searchTerm.trim() !== "" && brands.length === 0 ? (
                        <div className="no-results p-3">No results found</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            }
          />
        </main>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
