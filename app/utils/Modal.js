import { useEffect, useState } from 'react';
import "../style/animation.css"

export default function Modal({ data="hellow", openModal }) {
    return (
        <>
            {openModal && <div
                className={`${openModal ? "grow" : "fade-out"} absolute min-h-full w-full inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white`}
            >
                {data}
            </div>}
        </>
    );
}
