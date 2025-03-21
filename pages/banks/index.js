import React from "react";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import Heading from "@components/Heading";
import Image from "next/image";
import BannerStrip from "@components/BannerStrip";
// import Mahindrafinanace from '@Images/bank/mahindrafinanace.svg';
import CanaraBank from '@Images/bank/canaraBank.svg';
import Yesbank from '@Images/bank/yesbank.svg';
import Axis from '@Images/bank/axis.svg';


export default function bank() {
    const breadcrumbData = [
        { label: 'Home', link: '/' },
        { label: 'Bank', link: '#' },
    ];
    return (
        <>
            <Layout>
                <Banner
                    breadcrumbs={breadcrumbData}
                    heading={""}
                    bannerImg={"images/sellTractor/engineering-excellence-banner.svg"}
                    BannerUnderlineImg={false} />
                <BannerStrip heading={'Select Bank'}
                    content={<>
                        <div>
                            <form>
                                <div className='grid sm:grid-cols-4 grid-cols-2 gap-4 mt-4'>
                                    <div className="m-auto">
                                        {/* <Image src={Mahindrafinanace} alt="mahindrafinanace" /> */}
                                    </div> 
                                    <div className="m-auto">
                                        <Image src={CanaraBank} alt="canaraBank" /> 
                                    </div> 
                                    <div className="m-auto">
                                        <Image src={Yesbank} alt="yesbank" />  
                                    </div> 
                                    <div className="m-auto">
                                        <Image src={Axis} alt="axis" /> 
                                    </div>
                                </div>
                            </form> 
                        </div>
                    </>} />

            </Layout>
        </>
    )
}
