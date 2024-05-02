'use client'
import { useEffect, useState } from "react";
import moment from "moment";
import Options from "./Options";
import "./projects.css"
import ProjectTitle from "../utils/ProjectTitle";
import useProjectsStore from "../store";
import Modal from "../utils/Modal";
import ShowPage from "../utils/Pagination";
import { debounce } from "../utils/Debounce";

export default function Projects() {
    let { projects, setCurrentPage, currentPage } = useProjectsStore();
    const [openModal, setOpenModal] = useState(false);
    const [showData, setShowData] = useState([]);
    const [searchedText, setSearchedText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dueDateFilter, setDueDateFilter] = useState("");

    const handleModal = () => {
        setOpenModal(!openModal);
    }

    currentPage = currentPage.projectCurrentPage;
    let pageItems = 3;

    useEffect(() => {
        setShowData(projects.slice((currentPage - 1) * pageItems, pageItems * currentPage));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, projects]);


    const handleChange = (e) => {
        const value = e.target.value;
        debouncing(value)
    }

    const handleSearch = (data) => {
        setSearchedText(data)
    }

    const debouncing = debounce(handleSearch, 300);

    useEffect(() => {
        let filteredProjects = projects;

        if (searchedText) {
            filteredProjects = filteredProjects.filter(project =>
                project.name.toLowerCase().includes(searchedText.toLowerCase())
            );
        }

        if (statusFilter) {
            filteredProjects = filteredProjects.filter(project =>
                project.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (dueDateFilter) {
            filteredProjects = filteredProjects.filter(project =>
                moment(project.dueDate).format('YYYY-MM-DD') === dueDateFilter
            );
        }

        setShowData(filteredProjects.slice((currentPage - 1) * pageItems, pageItems * currentPage));
    }, [searchedText, statusFilter, dueDateFilter, currentPage, projects]);

    return (
        <div className="space-y-3 py-10">
            <input
                type="text"
                value={searchedText}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search by project name..."
            />
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mx-4"
            >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="in progress">In Progress</option>
                <option value="pending">Pending</option>
            </select>
            <input
                type="date"
                value={dueDateFilter}
                onChange={(e) => setDueDateFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Due Date"
            />
            <h1 className="text-xl md:text-2xl text-green-600 text-center mb-7">Projects Overview</h1>
            {showData.length > 0 ? showData.map(project => {
                const { id, name, description, status, dueDate, tasks, estimated_total_budget } = project;
                return (
                    <div key={id} className="flex flex-col md:flex-row md:items-center p-4 border border-gray-200 rounded-md space-y-3 md:space-y-0">
                        <div className="flex-1 md:min-w-[20%]">
                            <p className="font-bold">{id}.{name}</p>
                            <ProjectTitle name="Project" />
                        </div>
                        <div className="flex-1 md:text-center">
                            <p>
                                <span>{tasks?.filter(task => task.status === "Completed").length || 0}</span>/
                                <span>{tasks?.length}</span>
                            </p>
                            <ProjectTitle name="Tasks" />
                        </div>
                        <div className="flex-1 md:text-center">
                            <p>${estimated_total_budget}</p>
                            <ProjectTitle name="Budgets" />
                        </div>
                        <div className="flex-1 md:text-center">
                            <div>
                                <p className="font-semibold">{moment(dueDate).format('DD MMMM YYYY')}</p>
                                <ProjectTitle name="Due Date" />
                            </div>
                        </div>
                        <div className="flex-1 md:min-w-[10%] md:mx-auto md:text-center">
                            <p>
                                <span className={`text-sm font-semibold ${status.toLowerCase() === 'completed' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
                            </p>
                            <ProjectTitle name="Status" />
                        </div>
                        <Options handleModal={handleModal} data={project} type="project" />
                        <Modal openModal={openModal} handleModal={handleModal} type="project" />
                    </div>
                )
            }) : "No Data Found!"}

            <ShowPage
                length={projects.length}
                pageItems={pageItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                type="projectCurrentPage"
            />

        </div>
    )
}
