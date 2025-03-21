import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LIVE_INVENTORY } from "@utils/constants";
import { useTranslation } from 'next-i18next';
import Btn from '@components/Btn'

export const AdvanceSearch = ({ locale }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brandOptions, setBrandOptions] = useState([]);
  const [hpOptions, setHpOptions] = useState([]);
  const [priceRangeOptions, setPriceRangeOptions] = useState([]);
  const [liveInventoryData, setLiveInventoryData] = useState([]);
  const { t } = useTranslation();
  const language = locale?.toUpperCase();
  const { loading, error, data } = useQuery(GET_LIVE_INVENTORY, {
    variables: { lang: language },
  });
  
  useEffect(() => {
    if (data) {
      const brandSet = new Set(data.allLiveInventory.edges.map(edge => edge.node.liveInventoryData.brand));
      setBrandOptions([...brandSet]);
      setLiveInventoryData(data.allLiveInventory.edges.map(edge => edge.node.liveInventoryData));
    }
  }, [data,liveInventoryData]);

  // Fetch HP and calculate price ranges based on selected brand
  useEffect(() => {
    if (selectedBrand) {
      const filteredData = liveInventoryData.filter(item => item.brand === selectedBrand);
      const hpSet = new Set(filteredData.map(item => item.enginePower));
      setHpOptions([...hpSet]);

      // Calculate price ranges
      const maxPrice = Math.max(...filteredData.map(item => item.maxPrice));
      const numberOfRanges = 5; // You can adjust this number to create more or fewer ranges
      const stepSize = Math.ceil(maxPrice / numberOfRanges);
      const priceRanges = [];

      for (let i = stepSize; i < maxPrice; i += stepSize) {
        priceRanges.push(`${(i / 100000).toFixed(1)}L-${((i + stepSize) / 100000).toFixed(1)}L`);
      }
      setPriceRangeOptions(priceRanges);
    }
  }, [selectedBrand,liveInventoryData]);



  if (loading) return <p>Loading Brands ...</p>;
  if (error) return <p>Error: {error.message}</p>;




  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  return (
    <div className='flex justify-center lg:px-14 md:px-6 sm:px-3 px-2 relative
     sm:mt-[-10rem] mt-[-6.5rem] mb-4'>
      <div className='w-full bg-[#B6ABAB] bg-opacity-[20%] rounded-md sm:p-4 p-2'>
        <div className='bg-white rounded-md py-4 sm:px-16 px-3'>
          <div className='flex justify-center w-full'>
            <p className='text-center md:text-3xl sm:text-2xl text-[21px] font-semibold
                 custom-border-gradient
             w-fit sm:pb-3 pb-2 sm:px-0 px-16'>
              {t('FindTractor')}
            </p>
          </div>
          <div>
            <form>
              <div className='flex sm:flex-row flex-col gap-4 mt-4 items-end'>

                <div className='sm:w-1/4 w-full'>
                  <label htmlFor="Brand" className="block mb-2">{t('Brand')}</label>
                  <select id="Brand" className="bg-white border 
                    border-gray-300 text-black rounded-md  block w-full 
                     p-2.5 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white 
                     "
                    onChange={handleBrandChange}
                  >
                    <option selected>{t('SelectBrand')}</option>
                    {brandOptions.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div className='sm:w-1/4 w-full'>
                  <label htmlFor="Brand" className="block mb-2">{t('Horsepower')}</label>

                  <select id="Brand" className="bg-white border 
                    border-gray-300 text-black rounded-md  block w-full 
                     p-2.5 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white 
                     ">
                    <option selected>{t('SelectHorsepower')}</option>
                    {hpOptions.map(hp => (
                      <option key={hp} value={hp}>{hp}</option>
                    ))}
                  </select>
                </div>

                <div className='sm:w-1/4 w-full'>
                  <label htmlFor="PriceRange" className="block mb-2">{t('PriceRange')}</label>

                  <select id="PriceRange" className="bg-white border 
                    border-gray-300 text-black rounded-md  block w-full 
                     p-2.5 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white 
                     ">
                    <option selected>{t('SelectPriceRange')}</option>
                    {priceRangeOptions.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div className='py-1 cursor-pointer font-semibold text-secondaryColor 
                        text-right sm:hidden block'>{t('AdvanceSearch')}</div>
                <div className='sm:w-1/4 w-full'>
                  <Btn text={t('FindTractorBtn')} bgColor={true} />
                </div>
              </div>
            </form>
            <div className='sm:block cursor-pointer hidden pt-4 font-semibold
                 text-secondaryColor'>
              {AdvanceSearch}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
