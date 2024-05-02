'use client'
import { useState } from 'react'
import DetailsOptions from '../DetailsOption'
import Modal from '@/app/utils/Modal'
import moment from 'moment';

export default function ProjectDetails({ project }) {
    const [openModal, setOpenModal] = useState(false);
    if (!project) {
        return <div className="text-center text-gray-600 mt-5">Data not found</div>;
    }
    const { id, name, description, status, dueDate } = project;

    const handleModal = () => {
        setOpenModal(!openModal);
    }
    return (
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
            <div className="flex items-center">
                <DetailsOptions handleModal={handleModal} data={project} type="project" />
            </div>
            <Modal openModal={openModal} handleModal={handleModal} type="project" />
        </div>
    )
}
