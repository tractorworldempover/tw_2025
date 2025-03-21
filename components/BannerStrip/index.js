import React from 'react'

export default function BannerStrip({heading,content,isEnquiry}) {
    return (
        <>
            <div className={`${isEnquiry ? 'sm:mt-[-6rem] mt-[-6.5rem]':'sm:mt-[-6rem] mt-[-1.5rem]'} flex justify-center lg:px-14 md:px-6 sm:px-3 px-2 relative
             mb-4`}>
                <div className='w-full bg-[#B6ABAB] bg-opacity-[20%] rounded-md sm:p-4 p-2'>
                    <div className='bg-white rounded-md py-4 sm:px-16 px-3'>
                        <div className='flex justify-center w-full'>
                            <p className='text-center md:text-3xl sm:text-2xl text-[21px] font-semibold 
                            custom-border-gradient w-fit sm:pb-3 pb-2 sm:px-0 px-10'>
                                {heading}
                            </p>
                        </div> 
                        {content} 
                    </div>
                </div>
            </div>
        </>
    )
}
