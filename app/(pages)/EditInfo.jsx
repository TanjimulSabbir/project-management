import { useState } from 'react';
import Modal from "@/app/utils/Modal";
import toast from "react-hot-toast";
import moment from "moment";
import ProjectTitle from "@/app/utils/projectTitle";
import useProjectsStore from '@/app/store';
import Loading from '@/app/loading';
import Message from '@/app/result';

// Reusable input component
const InputField = ({ label, name, type = "task", defaultValue, placeholder, onChange }) => (
    <div className="flex flex-col w-full text-black">
        <label className="text-sm font-semibold">{label}</label>
        {type === "task" ? (
            <textarea
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mt-2"
                onChange={onChange}
            />
        ) : (
            <input
                name={name}
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mt-2"
                onChange={onChange}
            />
        )}
    </div>
);

// Reusable button component
const Button = ({ label, onClick, type }) => (
    <button
        onClick={onClick}
        className={`w-full px-4 py-2 rounded-md bg-green-600 text-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 ${type === "submit" ? '' : 'hover:bg-green-500'}`}
    >
        {label}
    </button>
);

const EditProjectHeader = ({ type }) => (
    <div className="pb-3 text-center font-semibold text-xl capitalize">Edit {type}</div>
);

export default function EditInfo({ handleModal, type }) {
    const { editTask, editProject, individualPost } = useProjectsStore();

    const data = individualPost[type];

    const [formData, setFormData] = useState({
        name: data.name,
        description: data.description,
        status: data.status,
        dueDate: moment(data.dueDate).format('YYYY-MM-DD'),
        estimated_total_budget: data.estimated_total_budget || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === "task") {
            const updatedTaskData = {
                name: e.target.elements.name.value,
                description: e.target.elements.description.value,
                status: e.target.elements.status.value,
                dueDate: e.target.elements.dueDate.value
            };
            editTask({ id: data.id, updatedData: updatedTaskData });
        } else if (type === "project") {
            const updatedProjectData = {
                name: e.target.elements.name.value,
                description: e.target.elements.description.value,
                status: e.target.elements.status.value,
                dueDate: e.target.elements.dueDate.value,
                estimated_total_budget: e.target.elements.estimated_total_budget.value
            };
            editProject({ id: data.id, updatedData: updatedProjectData });
        }
        setTimeout(() => { handleModal() }, 300)
    };

    const handleCancel = () => {
        handleModal();
    };

    return (
        <div className='p-10 bg-white rounded-xl shadow-2xl w-1/2 mx-auto mt-10 text-black'>
            <EditProjectHeader type={type} />
            <form onSubmit={handleSubmit} className="space-y-7 mb-5">
                <InputField label="Name" name="name" type="text" defaultValue={formData.name} placeholder="Enter project name" onChange={handleChange} />
                <InputField label="Description" name="description" type="textarea" defaultValue={formData.description} placeholder="Enter project description" onChange={handleChange} />

                {type === "task" && (
                    <InputField label="Add Member" name="teamMember" type="text" defaultValue={formData.teamMember || ""} placeholder="Enter team member name" onChange={handleChange} />
                )}
                {type === "project" && (
                    <InputField label="Budgets" name="estimated_total_budget" type="number" defaultValue={formData.estimated_total_budget} placeholder="Enter estimated total budget" onChange={handleChange} />
                )}
                <InputField label="Due Date" name="dueDate" type="date" defaultValue={formData.dueDate} onChange={handleChange} />
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
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
    );
}
