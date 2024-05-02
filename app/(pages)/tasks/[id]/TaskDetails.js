import { useState } from 'react';
import Modal from '@/app/utils/Modal';
import moment from 'moment';
import DetailsOptions from '../../DetailsOption';
import { usePathname } from 'next/navigation';
import useProjectsStore from '@/app/store';

export default function TaskDetails({ task }) {
    const [openModal, setOpenModal] = useState(false);
    const { projects, tasks } = useProjectsStore();
    const path = usePathname().split("/")[1]

    const { id, name, description, status, dueDate } = task;

    const handleModal = () => {
        setOpenModal(!openModal);
    }
    const teamMember = projects.find(project => project.members.some(item => item.task_id === id)).members[id - 1].team

    console.log(teamMember, "from TaskDetails")

    return (
        <div className={`flex items-center justify-center ${path === "tasks" && "h-screen"}`}>
            <div className="p-6 bg-white shadow rounded-lg">
                <div className="mb-4">
                    <h1 className="text-lg font-bold mb-1">{name}</h1>
                    <p className="text-black mt-5">{description}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-500">Status:</p>
                        <span className={`text-sm font-semibold ${status.toLowerCase() === 'completed' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Due Date:</p>
                        <p className="text-sm font-semibold">{moment(dueDate).format('DD MMMM YYYY')}</p>
                    </div>
                </div>
                <div className='py-5'>
                    <h1>Team members for this task</h1>
                    <div className='flex items-center flex-wrap gap-3 mt-3'>
                        {teamMember?.length > 0 ? teamMember.map((memberName, index) => (
                            <p key={index} className="text-sm font-semibold bg-green-600 p-2 rounded-md">{memberName}</p>
                        )) : <span className='text-xs text-red-600'>No team member(s) found!</span>}
                    </div>
                </div>
                <div className="flex items-center">
                    {path === "tasks" && <DetailsOptions handleModal={handleModal} data={task} type="task" />}
                </div>
                <Modal openModal={openModal} handleModal={handleModal} type="task" />
            </div>
        </div>
    )
}
