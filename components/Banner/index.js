import React from 'react';
import Image from 'next/image';
import BannerUnderline from '@Images/bannerUnderline.svg'

export default function Banner({breadcrumbs, bannerImg, heading,BannerUnderlineImg = true,text }) {
    return (
        <>
            <div className='bg-secondaryColor sm:text-[14px] text-[13px] uppercase px-2 sm:py-3 py-2 sm:text-center text-start text-white font-bold'>
                {breadcrumbs.map((breadcrumb, index) => (
                    <span key={index} className='font-bold'>
                        <a href={breadcrumb.link} className='text-white'>
                            {breadcrumb.label}
                        </a>
                        {index < breadcrumbs.length - 1 && ' • '}
                    </span>
                ))}
            </div>
            <div className='relative'>
               {bannerImg &&( <Image src={bannerImg} layout="responsive" className='mt-[-1px] w-full' alt='banner-image'/> )}
               
                {/* <div className=' sm:block hidden absolute top-4 left-14 text-white font-semibold text-xl'>
                    {heading}
                    {BannerUnderlineImg && (
                        <div>
                            <Image src={BannerUnderline} className='BannerUnderline' layout="responsive" alt='banner-underline'/>
                        </div>
                    )}
                </div> */}
                <p className='absolute sm:top-6 top-2 text-white sm:px-10 px-2 sm:text-lg text-medium'>{text}</p>
            </div>
        </>
    )
}
