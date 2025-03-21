import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Modal from "@components/Modal";
import Crossmark from '@Images/inventory/closeIcon.svg';
//import { getLocaleProps } from "@helpers";
import { useTranslation } from 'next-i18next';
import Btn from '@components/Btn';
import languagePopupImg from '@Images/languagePopup.svg';
import { useRouter } from 'next/router';


export async function getServerSideProps(context) {
    return await getLocaleProps(context);
}

export default function Interested() {
    const [showModal, setShowModal] = useState(true);
    const { t, i18n } = useTranslation('common');
     const router = useRouter();
    
    const handleClose = () => {
        router.push('/');
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

    return (
        <>
            <Modal showModal={showModal} customStyles={customStyles} handleClose={handleClose} content={
                <div className='flex items-center sm:flex-row flex-col-reverse w-full'>
                    <div className='w-full px-4 pb-4'>
                        <div className='mb-2'>
                            <label className='mb-2 block'>{t('Loan.Name')}</label>
                            <input type='text' placeholder={t('Loan.Enter_Name')} className='w-full rounded border-[#d1cccc]' />
                        </div>
                        <div className='mb-2'>
                            <label className='mb-2 block'>{t('Loan.Mobile_No')}</label>
                            <input type='text' placeholder={t('Loan.Enter_Mobile_NO')} className='w-full rounded border-[#d1cccc]' />
                        </div>
                        <div className='w-full mt-3'>
                            <Btn text={t('Home.Submit')} bgColor={true} />
                        </div>
                    </div>
                    <div className="sm:relative w-[329px] h-[223px] overflow-hidden">
                        <Image
                            src={languagePopupImg}
                            layout='responsive'
                            width={610}
                            height={452}
                            className='languagePopupImg'
                            alt='languagePopupImg'
                        />
                    </div>

                </div>
            } />


        </>



    )
}
