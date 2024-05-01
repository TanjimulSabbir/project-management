import { useState } from 'react';
import Modal from "@/app/utils/Modal";
import toast from "react-hot-toast";
import moment from "moment";
import ProjectTitle from "@/app/utils/projectTitle";

// Reusable input component
const InputField = ({ label, type = "task", defaultValue, placeholder }) => (
    <div className="flex flex-col w-full">
        <label className="text-sm font-semibold">{label}</label>
        {type === "task" ? (
            <textarea
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mt-2"
            />
        ) : (
            <input
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mt-2"
            />
        )}
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
    <div className="pb-3 text-center font-semibold text-xl">Edit Project</div>
);

export default function EditInfo({ data, handleModal, type }) {
    const [status, setStatus] = useState(data.status);
    const [teamMember, setTeamMember] = useState("");

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
                <form onSubmit={handleSubmit} className="space-y-7 mb-5">
                    <InputField label="Name" type="text" defaultValue={data.name} placeholder="Enter project name" />
                    <InputField label="Description" type="textarea" defaultValue={data.description} placeholder="Enter project description" />

                    {"task" === "task" && (
                        <InputField label="Add Member" type="text" defaultValue={teamMember || ""} placeholder="Enter team member name" />
                    )}
                    {type === "project" && (
                        <InputField label="Budgets" type="number" defaultValue={data?.estimated_total_budget} placeholder="Enter estimated total budget" />
                    )}
                    <InputField label="Due Date" type="date" defaultValue={moment(data.dueDate).format('YYYY-MM-DD')} />
                    <div className="flex flex-col w-full">
                        <label className="text-sm font-semibold">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mt-2"
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <Button label="Save" type="submit" />
                        <Button label="Cancel" onClick={handleCancel} />
                    </div>
                </form>
            </div>
        </>
    );
}
