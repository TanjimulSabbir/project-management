"use client"
import { useEffect, useState } from "react";
import moment from "moment";
import Options from "./Options";
import "./projects.css"
import ProjectTitle from "../utils/ProjectTitle";
import useProjectsStore from "../store";
import ShowPage from "../utils/Pagination";
import Modal from "../utils/Modal";
import { debounce } from "../utils/Debounce";

export default function Tasks() {
    let { tasks, setTasks, setCurrentPage, currentPage, removeData } = useProjectsStore();
    const [openModal, setOpenModal] = useState(false);
    const [showData, setShowData] = useState([]);
    const [searchedText, setSearchedText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dueDateFilter, setDueDateFilter] = useState("");

    const handleModal = () => {
        setOpenModal(!openModal);
    }

    currentPage = currentPage.tasksCurrentPage;
    let pageItems = 3;

    useEffect(() => {
        setShowData(tasks.slice((currentPage - 1) * pageItems, pageItems * currentPage));
    }, [currentPage, tasks, setTasks]);

    const handleChange = (e) => {
        setSearchedText(e.target.value);
    }

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    }

    const handleDueDateFilterChange = (e) => {
        setDueDateFilter(e.target.value);
    }

    useEffect(() => {
        const filteredData = tasks.filter(task => {
            const nameMatch = task.name.toLowerCase().includes(searchedText.toLowerCase());
            const statusMatch = statusFilter ? task.status.toLowerCase() === statusFilter.toLowerCase() : true;
            const dueDateMatch = dueDateFilter ? moment(task.dueDate).format('DD MMMM YYYY') === dueDateFilter : true;
            return nameMatch && statusMatch && dueDateMatch;
        });
        setShowData(filteredData.slice((currentPage - 1) * pageItems, pageItems * currentPage));
    }, [searchedText, statusFilter, dueDateFilter, currentPage, tasks]);

    return (
        <div className="space-y-5 py-10">
            <div className="flex items-center space-x-3">
                <input
                    type="text"
                    value={searchedText}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Search by task name..."
                />
                <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                </select>
                <input
                    type="date"
                    value={dueDateFilter}
                    onChange={handleDueDateFilterChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Due Date"
                />
            </div>
            <h1 className="text-2xl text-green-600 text-center mb-7">Tasks Overview</h1>
            {showData.length > 0 ? showData.map(task => {
                const { id, name, description, status, dueDate } = task;
                return (
                    <div key={id} className="flex flex-col md:flex-row md:items-center p-4 border border-gray-200 rounded-md space-y-3 md:space-y-0">
                        <div className="flex-1 min-w-[30%]">
                            <p className="font-bold">{id}.{name}</p>
                            <ProjectTitle name={"Task"} />
                        </div>
                        <div className="flex-1 min-w-[10%] md:mx-auto md:text-center">
                            <p>
                                <span className={`text-sm font-semibold ${status.toLowerCase() === 'completed' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
                            </p>
                            <ProjectTitle name="Status" />
                        </div>
                        <div className="flex-1">
                            <div>
                                <p className="font-semibold">{moment(dueDate).format('DD MMMM YYYY')}</p>
                                <ProjectTitle name="Due Date" />
                            </div>
                        </div>
                        <Options handleModal={handleModal} data={task} type="task" />
                        <Modal openModal={openModal} handleModal={handleModal} type="task" />
                    </div>
                )
            }) : "No data found!"}

            <ShowPage
                length={tasks.length}
                pageItems={pageItems}
                currentPage={currentPage.projectCurrentPage}
                setCurrentPage={setCurrentPage}
                type="tasksCurrentPage"
            />
        </div>
    )
}
