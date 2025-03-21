import React, { useEffect, useState } from 'react'
import Layout from "@components/Layout";
import { getLocaleProps } from "@helpers";
import HomePage from './home';
import Image from 'next/image';
import languagePopupImg from '@Images/languagePopup.svg';
import Btn from '@components/Btn';
import Modal from "@components/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
// import { useGeolocation } from '@utils';
import { setModalStatus } from '../store/slices/userDataSlice';

export default function Home({ locale, inventoryData}) {
  // const { error} = useGeolocation();
  const dispatch = useDispatch()
  const router = useRouter();
  const { i18n } = useTranslation();
  const addressFromStore = useSelector((state) => state.user.addressData.state)
  const modalStatus = useSelector((state) => state.user.modalStatus)

  const [showModal, setShowModal] = useState(modalStatus ? false : true);
  const handleClose = () => setShowModal(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

 // console.log(modalStatus, "modalStatus from store")

  const languageMap = [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Marathi", value: "marathi" },
  ]

  const localeNames = {
    english: 'en',
    hindi: 'hi',
    marathi: 'mr',
  };


  const determineLanguage = (state) => {
    // debugger;
    if (state === 'Madhya Pradesh') {
      return 'hindi';
    }
    else if (state === 'Maharashtra') {
      return 'marathi';
    }
    else {
      return 'english';
    }
  };

  useEffect(() => {
    if (addressFromStore) {
      const language = determineLanguage(addressFromStore);
      setSelectedLanguage(language);
    }
  }, [addressFromStore]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const showLanguageModal = () => {
    setShowModal(true); 
   }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const handleSubmit = () => {
    debugger;
    const newLocale = localeNames[selectedLanguage];
    i18n.changeLanguage(newLocale);
    router.push(router.asPath, router.asPath, { locale: newLocale });
    setShowModal(false);
    dispatch(setModalStatus({ modalStatus: true }))
  };

  // useEffect(() => {
  //   getLocation();
  // }, [])
 
  return (

    <>
      <Layout currentPage={"home"} onClick={showLanguageModal}>
        <HomePage locale={locale} inventoryData={inventoryData} />
      </Layout>
      <Modal showModal={showModal} customStyles={customStyles} handleClose={handleClose} content={
        <div className='flex items-center sm:flex-row flex-col-reverse w-full'>
          <div className='px-4 py-10'>
            <p className='font-bold  text-xl'>Select your preferred<br></br> Language</p>
            <span className='mt-6 block text-sm'>Select Language</span>
            <div className='flex gap-4 my-4'>
              {languageMap && languageMap?.map((lang) => (
                <div
                  key={lang}
                  className={`radio-group border-[1px] border-black px-2 py-1 rounded ${selectedLanguage === lang ? 'border-secondaryColor' : ''}`}
                >
                  <input
                    type="radio"
                    name="language"
                    value={lang.value}
                    id={lang.value}
                    checked={selectedLanguage === lang.value}
                    className=""
                    onChange={handleLanguageChange}
                  />
                  <label htmlFor={lang.value} className={`ml-2 ${selectedLanguage === lang.value ? 'text-secondaryColor' : ''} font-medium`}>
                    {lang.label}
                  </label>
                </div>
              ))}
            </div>

            <div>
              <Btn text={'Submit'} bgColor={true} onClick={handleSubmit} />
            </div>
          </div>
          <div className="sm:relative sm:w-[400px] sm:h-[288px] w-full h-[238px] overflow-hidden">
            <Image
              src={languagePopupImg}
              layout='responsive'
              width={400}
              height={340}
              className='languagePopupImg'
              alt='languagePopupImg'
            />
          </div>

        </div>
      } />
    </>

  );
}
export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}