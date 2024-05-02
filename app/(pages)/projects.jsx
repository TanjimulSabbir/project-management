"use client"
import { useEffect, useState } from "react";
import moment from "moment";
import Options from "./Options";
import "./projects.css"
import ProjectTitle from "../utils/ProjectTitle";
import useProjectsStore from "../store";
import Modal from "../utils/Modal";
import ShowPage from "../utils/Pagination";


export default function Projects() {
    let { projects, setProjects, setCurrentPage, currentPage, removeId } = useProjectsStore();
    const [openModal, setOpenModal] = useState(false);
    const [showData, setShowData] = useState([])

    const handleModal = () => {
        setOpenModal(!openModal);
    }

    currentPage = currentPage.projectCurrentPage
    let pageItems = 3;

    console.log(projects, "from projects")

    useEffect(() => {
        setShowData(projects.slice((currentPage - 1) * pageItems, pageItems * currentPage));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, projects]);

    return (
        <div className="space-y-3 py-10">
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
