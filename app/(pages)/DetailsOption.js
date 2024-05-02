import React, { useEffect } from 'react';
import ConfirmationModal from "@/app/utils/Confirmation";
import useProjectsStore from '@/app/store';
import { usePathname } from 'next/navigation';

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

export default function DetailsOptions({ handleModal, data, type }) {
    const { setIndividualPost, removeData, setRemoveId } = useProjectsStore();
    const path = usePathname().split("/")[1]

    useEffect(() => {
        setIndividualPost({ data, type })
    }, [data, type])

    const handleOption = (option) => {
        switch (option) {
            case "edit":
                handleEdit(data);
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

    const handleDelete = () => {
        if (type === "project") {
            removeData({ id: data.id, deleteType: "projects" })
        } else {
            removeData({ id: data.id, deleteType: "tasks" })
        }

        setRemoveId({ id: data.id, type })
    };

    return (
        <>
            <div className="flex items-center space-x-4">
                <OptionButton label="Edit" onClick={() => handleOption("edit")} />
                <ConfirmationModal id={data.id} handleDelete={handleDelete} />
            </div>
        </>
    );
}
