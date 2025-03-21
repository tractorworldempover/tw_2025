import React, { useState } from 'react'
import Modal from 'react-modal';
import Image from 'next/image'; 
import CloseIcon from '@Images/closeIcon.svg';


export default function ModalComponent({ showModal, handleClose,customStyles,content, CloseIconShow =true }) {
 
     return (
        <div>
            <Modal
                isOpen={showModal}
                style={customStyles}
                contentLabel="languageSelectionModal">
             {CloseIconShow && (<button className='absolute right-2 top-2 z-50' onClick={handleClose}>
                    <Image src={CloseIcon} alt='closeIcon' width={19} height={19} /> 
                </button> )}
                <div className='w-full'>
                   {content}
                </div>
            </Modal>
        </div>
    )
}
