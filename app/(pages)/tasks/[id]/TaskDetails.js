"use client"
import { useState } from 'react';
import Modal from '@/app/utils/Modal';
import moment from 'moment';
import DetailsOptions from '../../DetailsOption';

export default function TaskDetails({ task }) {
    const [openModal, setOpenModal] = useState(false);
    if (!task) {
        return <div className="text-center text-gray-600 mt-5">Data not found</div>;
    }
    const { id, name, description, status, dueDate } = task;

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
                <DetailsOptions handleModal={handleModal} data={task} type="task" />
            </div>
            <Modal openModal={openModal} handleModal={handleModal} type="task" />
        </div>
    )
}
