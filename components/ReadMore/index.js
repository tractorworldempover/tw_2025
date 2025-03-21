import React from 'react';
import CardArrow from '@Images/cardArrow.svg';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export const ReadMore = ({onClick}) => {
    const { t } = useTranslation('common');

    return (
        <>
            <div className="xl:px-6 px-4 py-4 border-t-2 cursor-pointer" onClick={onClick}>
                <span className="flex items-center gap-1 text-sm font-semibold
                                text-secondaryColor mr-2">{t('SellTractor.Read_more')}
                    <Image src={CardArrow} width={17} alt='CardArrow-image' /> </span>
            </div>
        </>
    )
}
