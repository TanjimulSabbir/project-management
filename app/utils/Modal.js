import "../(pages)/projects.css"
import EditInfo from '../(pages)/EditInfo';

export default function Modal({ handleModal, openModal, type }) {
    return (
        <>
            {openModal && <div
                className={`${openModal ? "grow" : "fade-out"} absolute min-h-full w-full inset-0 bg-[#000000a3] text-white z-50`}
            >
                <EditInfo handleModal={handleModal} type={type} />
            </div>}
        </>
    );
}
