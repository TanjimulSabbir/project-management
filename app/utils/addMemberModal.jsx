import AddMemberForm from "../(pages)/AddMember";
import "../style/animation.css"


export default function AddMemberModal({ projectId, setOpenAddMember }) {
    return (
        <>
            <div className={`grow absolute min-h-full w-full inset-0 bg-[#000000a3] text-white z-50`}>
                <AddMemberForm projectId={projectId} setOpenAddMember={setOpenAddMember} />
            </div>
        </>
    );



}
