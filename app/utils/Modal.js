import "../style/animation.css"
import EditInfo from '../(pages)/EditInfo';

export default function Modal({ handleModal, openModal, type }) {
    return (
        <>
            {openModal && <div
                className={`${openModal ? "grow" : "fade-out"} absolute h-full w-full inset-0 bg-[#000000a3] z-50 py-5 md:py-10`}
            >
                <EditInfo handleModal={handleModal} type={type} />
            </div>}
        </>
    );
}
