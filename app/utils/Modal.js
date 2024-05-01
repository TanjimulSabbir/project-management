import "../style/animation.css"
import EditInfo from '../(pages)/projects/EditInfo';

export default function Modal({ data, handleModal, openModal, type }) {
    return (
        <>
            {openModal && <div
                className={`${openModal ? "grow" : "fade-out"} absolute min-h-full w-full inset-0 bg-[#000000a3] text-white z-50`}
            >
                <EditInfo data={data} handleModal={handleModal} type={type} />
            </div>}
        </>
    );
}
