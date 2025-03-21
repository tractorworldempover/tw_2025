import React, { useState } from 'react';
import Image from 'next/image';
import Banner from "@components/Banner";
import Layout from "@components/Layout";
import Tractor1 from '@Images/offers/1.svg';
import Leftarrow from '@Images/offers/leftarrow.svg';
import Rightarrow from '@Images/offers/rightarrow.svg';
import bannerImg from '@Images/sellTractor/engineering-excellence-banner.svg';
import Pagination from "@components/Pagination";  


export default function ExclusiveOffers() {
    const breadcrumbData = [
        { label: 'Home', link: '/' },
        { label: 'Offers', link: '#' },
    ];

    // Sample card data (replace with your actual data)
    const cardData = [
        {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            id: 2,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 3,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 4,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 5,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 6,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            id: 1,
            imageSrc: Tractor1,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 2,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 3,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 4,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 5,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 6,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 7,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 8,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 9,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 10,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 11,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 12,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, 
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
         {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
         {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, 
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, 
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, 
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
         {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
         {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, 
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
         {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, 
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, 
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
         {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
         {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
         {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        },
         {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, 
        {
            imageSrc: Tractor1,
            id: 13,
            title: "Heavy Duty Dhamaka Returns-Sonalika",
            startDate: "14 Apr, 2024"
        }, 
    ]; 

    //pagination
    const CardsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(cardData.length / CardsPerPage);
    const indexOfLastCard = currentPage * CardsPerPage;
    const indexOfFirstCard = indexOfLastCard - CardsPerPage;
    const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard); 

    return (
        <Layout currentPage={"offers"}>
            <Banner
                breadcrumbs={breadcrumbData}
                heading={"Exclusive Offers"}
                bannerImg={bannerImg}
            />
            <div className='bg-white lg:px-14 md:px-6 sm:px-3 px-2 sm:pt-4 pt-2 py-3'>
                <div className='grid sm:grid-cols-3 gap-4'>
                    {currentCards.map((card, index) => (
                        <div key={index} className="gap-4 bg-white border-[#D9D9D9] border-[1px] overflow-hidden shadow-lg">
                            <div className="relative">
                                <Image className="w-full" src={card.imageSrc} alt="cardImage" layout="responsive" width={100} height={70} />
                            </div>
                            <div className="xl:px-6 lg:px-4 sm:px-2 px-4 pt-1">
                                <div className="ellipsis font-bold xl:text-lg md:text-[16px] sm:text-[14px] text-base tractorTitle">
                                    {card.title}
                                </div>
                                <p className='py-1 text-[14px]'>Starts From : {card.startDate}</p>
                            </div>
                            <div className='border-t-[1px] border-[#D9D9D9] relative bottom-0'>
                                <div className="m-[1px] xl:px-6 px-4 pt-4 pb-2 bg-secondaryColor cursor-pointer">
                                    <span className="flex items-center gap-1 font-semibold text-white mr-2 mb-2 text-base justify-center">
                                        Check For Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            <Pagination
                data={cardData}
                TotalPages={totalPages}
                CurrentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
               
            </div>
        </Layout>
    );
}
