import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import shareIcon from '@Images/tractordetails/shareIcon.svg';
import DefaultTractor from "@Images/default_tractor.svg";

export default function InventoryCarousel({ images = [], locale }) {
   // console.log("Received images in Carousel:", images);
  
    const authKey = "?sv=2021-12-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-04-01T14:30:38Z&st=2023-03-29T06:30:38Z&spr=https&sig=mk0i2ZPyaotRM5smvwnf9y9%2BcZljr9BrtLIK2%2FnnJ6k%3D";

    const language = locale?.toUpperCase();
    const imageArray = Array.isArray(images) ? images.map(img => img.processed_image + authKey) : [];

  
    const handleImageError = (e) => {
      e.target.src = DefaultTractor.src; // Fallback if image fails to load
    };

  
    const settings = {
      customPaging: function (i) {
        return (
          <a>
            <img
              className="w-full object-cover"
              width={100}
              height={100}
              src={imageArray[i] || DefaultTractor.src}
              alt={`thumb-${i}`}
              onError={handleImageError}
            />
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    const handleShareClick = () => {
      const MessageText = language === "HI"
        ? "ट्रैक्टर वर्ल्ड देखें!"
        : language === "MR"
        ? "ट्रॅक्टर वर्ल्ड पहा!"
        : "Check out Tractor World!";
      const message = encodeURIComponent(`${MessageText} https://tractor-world-2024.vercel.app/`);
      const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;
      window.open(whatsappURL, "_blank");
    };

    
   // console.log("authimage"+JSON.stringify(imageArray));
    return (
      <div className="slider-container" id="inventoryCarousel">
        <Slider {...settings}>
          {imageArray.length > 0 ? (
            imageArray.map((img, index) => (
              <div className="relative" key={index}>
                <img
                  width={519}
                  height={397}
                  src={img || DefaultTractor.src} // Fallback if img is undefined
                  onError={handleImageError}
                  className="detailsSlideImg justify-center object-contain"
                  style={{ maxWidth: "519px", maxHeight: "397px" }}
                  alt={`slide-${index}`}
                />
                <div className="absolute top-4 right-4">
                  <Image
                    src={shareIcon}
                    alt="shareIcon"
                    className="cursor-pointer"
                    width={25}
                    height={25}
                    onClick={handleShareClick}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="relative">
              <Image
                width={519}
                height={397}
                src={DefaultTractor}
                className="detailsSlideImg"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                alt="default"
              />
            </div>
          )}
        </Slider>
      </div>
    );
  }
  
