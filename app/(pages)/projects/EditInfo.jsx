import { useState } from 'react';
import Modal from "@/app/utils/Modal";
import toast from "react-hot-toast";
import moment from "moment";
import ProjectTitle from "@/app/utils/projectTitle";

// Reusable input component
const InputField = ({ label, type, defaultValue }) => (
    <div className="w-full">
        <ProjectTitle name={label} />
        <input
            type={type}
            defaultValue={defaultValue}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mt-2"
        />
    </div>
);

// Reusable button component
const Button = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
    >
        {label}
    </button>
);

const EditProjectHeader = () => (
    <div className="pb-3 text-center">Edit Project</div>
);

export default function EditInfo({ data, handleModal }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        toast.success("Project information updated!");
        handleModal();
    };

    const handleCancel = () => {
        handleModal();
    };

    return (
        <>
        
            <div className='p-10 bg-white rounded-xl shadow-2xl w-1/2 mx-auto mt-10'>
            <EditProjectHeader />
                <div key={data.id} className="space-y-7 mb-5">
                    <InputField label="Development Name" type="text" defaultValue={data.name} />
                    <InputField label="Budgets" type="number" defaultValue={data?.estimated_total_budget} />
                    <InputField label="Due Date" type="date" defaultValue={moment(data.dueDate).format('YYYY-MM-DD')} />
                    <InputField label="Status" type="text" defaultValue={data.status} />
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <Button label="Save" onClick={handleSubmit} />
                    <Button label="Cancel" onClick={handleCancel} />
                </div>
            </div>
        </>
    );
}
