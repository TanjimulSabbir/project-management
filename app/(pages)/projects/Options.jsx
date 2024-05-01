import toast from "react-hot-toast";

// Reusable button component
const OptionButton = ({ label, onClick }) => (
    <div className="flex-grow">
        <button
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={onClick}
        >
            {label}
        </button>
    </div>
);

export default function Options({ handleModal }) {
    const handleOption = (option) => {
        switch (option) {
            case "edit":
                handleEdit();
                break;
            case "view_details":
                handleViewDetails();
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

    const handleViewDetails = () => {
        toast.success("View Details clicked");
    };

    const handleDelete = () => {
        toast.success("Delete clicked");
    };

    return (
        <div className="flex items-center space-x-4">
            <OptionButton label="Edit" onClick={() => handleOption("edit")} />
            <OptionButton label="View Details" onClick={() => handleOption("view_details")} />
            <OptionButton label="Delete" onClick={() => handleOption("delete")} />
        </div>
    );
}
