// components/SlickCarousel.js
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Time from '@Images/time.svg';
import HP from '@Images/hp.svg';
import Wheel from '@Images/wheel.svg';
import DefaultTractor from '@Images/default_tractor.svg';
import { useTranslation } from 'next-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatPrice } from "@utils"; 

const SlickCarousel = ({ items, settings }) => {
  const router = useRouter();


  const handleEnquiry = () => {
    router.push('/interested');
};


  const { t } = useTranslation();
  const CheckTractorDetails = "Interested";
  return (
    <div className="slider-container mt-4 bg-white">
      <Slider {...settings} className=''>
        {items.map((item, index) => (
          <div key={index} className="gap-4 bg-white border-[#D9D9D9] border-[1px]
           overflow-hidden shadow-lg cursor-pointer">
            <div className="relative" onClick={() => router.push(`/tractor-details/${item.tractorId}`)}>
              <Image className="w-full" src={DefaultTractor} alt="cardImage" layout="responsive" width={100} height={70} /> 
              <div className="bg-secondaryColor px-2  text-white text-sm absolute top-4 left-4
               uppercase font-medium border-gradient">
               CERTIFIED
              </div>
              {item.price && (<div className='bg-black font-semibold text-white w-auto px-2 py-1 float-right'>
                 {formatPrice(item.price)}
              </div>
              )}
            </div>
            <div className="xl:px-6 lg:px-4 sm:px-2 px-4 pt-1 h-28">
              <div className="ellipsis font-bold xl:text-lg md:text-[16px] sm:text-[14px] text-base tractorTitle">
                {item.title}
              </div>
              <div className="flex items-center xl:text-base lg:text-sm sm:text-sm text-base my-3">
                {item.hours && (<div className='flex gap-1 h-[14px] items-center border-r-[1px] border-black pr-2'>
                  <Image src={Time} alt='Time'></Image> {item.hours} hrs
                </div>
                )}
                {item.driveType && (<div className='pl-2 flex gap-1 h-[14px] items-center border-r-[1px] border-black pr-2'>
                  <Image src={Wheel} alt='Wheel'></Image> {item.driveType}
                </div>
                )}
                {item.enginePower && (<div className='pl-2 flex gap-1 h-[14px] items-center pr-2'>
                  <Image src={HP} alt='HP'></Image> {item.enginePower}
                </div>
                )}
              </div> 
            </div>
             <div className='border-t-[1px] border-[#D9D9D9] relative bottom-0'>
              <div className="m-[1px] xl:px-6 px-4 pt-4 pb-2 bg-secondaryColor cursor-pointer">
                <span className="flex items-center gap-1 font-semibold text-white mr-2 mb-2 text-base justify-center" onClick={handleEnquiry}>{CheckTractorDetails}</span>
              </div>
            </div>
           </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickCarousel;
