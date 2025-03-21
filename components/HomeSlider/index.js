import { useEffect, useState } from 'react';
import { HOME_SLIDERS,customImageLoader } from "@utils/constants";
import { useQuery } from "@apollo/client";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { AdvanceSearch } from '../AdvanceSearch';
import Image from 'next/image'; 

export default function HomeSliders({ locale }) {

    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isFirstSlide = currentIndex === 0;
    const language = locale?.toUpperCase();
    const { loading, error, data } = useQuery(HOME_SLIDERS, {
        variables: { lang: language }
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            // alert(isMobile)// Adjust the breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]); // Empty dependency array ensures useEffect runs only once after initial render

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const slides = data.homeSliders.nodes.map(node => {
        const desktopUrl = node.homesliders.sliderimage.node.mediaItemUrl;
        const mobileUrl = node.homesliders.mobilesliderimage.node.mediaItemUrl;
        return { desktopUrl, mobileUrl };
    });

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };


    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <>
            <div className='max-w-full w-full m-auto relative group'>
                <div className='w-full h-full bg-center bg-cover duration-500 pb-10'> 
                    <Image loader={customImageLoader} src={isMobile ? `${slides[currentIndex].mobileUrl}` :
                        `${slides[currentIndex].desktopUrl}`} className='sm:pb-24 bg-white w-full' alt='mobile-url'/> 
                </div>  
            </div> 
             {/* advancs search */}
             <AdvanceSearch locale={locale}/>

        </>
    );
};
