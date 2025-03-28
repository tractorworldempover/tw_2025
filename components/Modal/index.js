import React, { useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image'; 
import CloseIcon from '@Images/closeIcon.svg';

export default function ModalComponent({ showModal, handleClose, customStyles, content, CloseIconShow = true }) {
    
    useEffect(() => {
        Modal.setAppElement('#__next'); // Ensure modal works in Next.js
    }, []);

    const defaultStyles = {
        overlay: { zIndex: 1000, backgroundColor: "rgba(0,0,0,0.5)" },
        content: { 
        top: "50%", 
        left: "50%", 
        right: "auto", 
        bottom: "auto", 
        marginRight: "-50%", 
        transform: "translate(-50%, -50%)",
        width: "80vw",  
        maxWidth: "1200px",
        height: "60vh", 
        maxHeight: "700px", 
        backgroundColor: "#000", 
        borderRadius: "10px", 
        padding: "0px" 
         }
    };

    return (
        <div>
            <Modal
                isOpen={showModal}
                style={customStyles || defaultStyles}
                contentLabel="languageSelectionModal"
            >
                {CloseIconShow && (
                    <button 
                        className='absolute right-2 top-2 z-50' 
                        onClick={() => {
                            console.log("Close button clicked!");
                            handleClose();
                        }}
                    >
                        <Image src={CloseIcon} alt='closeIcon' width={19} height={19} />
                    </button>
                )}
                <div className='w-full'>
                    {content}
                </div>
            </Modal>
        </div>
    );
}
