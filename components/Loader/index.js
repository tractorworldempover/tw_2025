import React from 'react';
import Image from 'next/image';
export default function Loader({ loaderImage }) {
    return (
        <>
            <div className="loader-overlay overlay">
                <Image src={loaderImage} width={130} height={130} />
            </div>
        </>
    )
}


