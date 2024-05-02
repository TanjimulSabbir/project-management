import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useProjectsStore from "@/app/store";
import ConfirmationModal from "@/app/utils/Confirmation";
import toast from "react-hot-toast";

// Reusable button component
const OptionButton = ({ label, onClick }) => (
    <div className="flex-grow">
        <button
            className="w-full rounded-md border border-gray-300 bg-white px-0 md:px-4 py-2 text-sm font-bold text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
            onClick={onClick}
        >
            {label}
        </button>
    </div>
);

export default function Options({ handleModal, data, type }) {
    const { setIndividualPost, removeData, setRemoveId } = useProjectsStore();
    const router = useRouter();

    useEffect(() => {
        setIndividualPost({ data, type })
    }, [data, type])

    const handleOption = (option) => {
        switch (option) {
            case "edit":
                handleEdit(data);
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

    const handleEdit = (data) => {
        setIndividualPost({ data, type })
        handleModal();
    };

    const handleViewDetails = (data) => {
        setIndividualPost({ data, type })
        router.push(`/${type}s/${data.id}`)
    };

    const handleDelete = (id) => {
        if (type === "project") {
            removeData({ id, deleteType: "projects" })
        } else {
            removeData({ id, deleteType: "tasks" })
        }

        setRemoveId({ id, type })
    };

    return (
        <>
            <div className="flex items-center space-x-2 md:space-x-4">
                <OptionButton label="Edit" onClick={() => handleOption("edit")} />
                <OptionButton label="View Details" onClick={() => handleOption("view_details")} />
                <ConfirmationModal id={data.id} handleDelete={handleDelete}/>
            </div>
        </>
    );
}
