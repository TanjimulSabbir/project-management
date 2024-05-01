import React from 'react';
import { useRouter } from 'next/navigation';
import useProjectsStore from "@/app/store";
import ConfirmationModal from "@/app/utils/Confirmation";
import toast from "react-hot-toast";

// Reusable button component
const OptionButton = ({ label, onClick }) => (
    <div className="flex-grow">
        <button
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
            onClick={onClick}
        >
            {label}
        </button>
    </div>
);

export default function Options({ handleModal, data }) {
    const router = useRouter();
    const { setIndividualPost, removeProject } = useProjectsStore();

    console.log(data, "from option")

    const handleOption = (option) => {
        switch (option) {
            case "edit":
                handleEdit();
                break;
            case "view_details":
                handleViewDetails(data);
                break;
            case "delete":
                handleDelete();
                break;
            default:
                break;
        }
    };

    const handleEdit = () => {
        toast.success("Edit clicked");
        handleModal();
    };

    const handleViewDetails = (data) => {
        setIndividualPost({ data, type: "task" })
        router.push(`/projects/${data.id}`)
    };

    const handleDelete = (id) => {
        removeProject(id)
    };

    return (
        <>
            <div className="flex items-center space-x-4">
                <OptionButton label="Edit" onClick={() => handleOption("edit")} />
                <OptionButton label="View Details" onClick={() => handleOption("view_details")} />
                <ConfirmationModal id={data.id} handleDelete={handleDelete} />
            </div>
        </>
    );
}
