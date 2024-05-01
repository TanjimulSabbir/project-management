import { useEffect, useState } from 'react';
import "../style/animation.css"
import EditInfo from '../(pages)/projects/EditInfo';

export default function Modal({ data = "hellow", handleModal, openModal }) {
    return (
        <>
            {openModal && <div
                className={`${openModal ? "grow" : "fade-out"} absolute min-h-full w-full inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white`}
            >
                <EditInfo data={data} handleModal={handleModal} />
            </div>}
        </>
    );
}
