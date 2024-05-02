'use client'
import { useState } from 'react'
import DetailsOptions from '../DetailsOption'
import Modal from '@/app/utils/Modal'
import moment from 'moment';
import AddMemberModal from '@/app/utils/addMemberModal';
import { IoMdAdd } from 'react-icons/io';


export default function ProjectDetails({ project }) {
    const [openModal, setOpenModal] = useState(false);
    const [openAddMember, setOpenAddMember] = useState(false);

    const addMemberBtnStye = "rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 ml-3 cursor-pointer flex items-center space-x-2"
    if (!project) {
        return <div className="text-center text-gray-600 mt-5">Data not found</div>;
    }
    const { id, name, description, status, dueDate, tasks, memeber } = project;

console.log(project,"from projectDetails")


    const handleModal = () => {
        setOpenModal(!openModal);
    }

    const handleAddMember = () => {
        setOpenAddMember(!openAddMember)
    }


    return (
        <div>
            <div className='flex items-center justify-center h-screen'>
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <div className="mb-4">
                        <h1 className="text-lg font-bold mb-1">{name}</h1>
                        <p className="text-gray-600 mt-5">{description}</p>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Status:</p>
                            <span className={`text-sm font-semibold ${status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Due Date:</p>
                            <p className="text-sm font-semibold">{moment(dueDate).format('DD MMMM YYYY')}</p>
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <DetailsOptions handleModal={handleModal} data={project} type="project" />
                        <p className={addMemberBtnStye} onClick={handleAddMember}>
                            <IoMdAdd />   <span>Add Member</span>
                        </p>
                    </div>
                    <Modal openModal={openModal} handleModal={handleModal} type="project" />
                </div>
            </div>

            {openAddMember && <AddMemberModal projectId={id} setOpenAddMember={setOpenAddMember} />}
        </div>
    )
}
