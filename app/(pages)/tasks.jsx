"use client"
import { useEffect, useState } from "react";
import moment from "moment";
import Options from "./Options";
import "./projects.css"
import ProjectTitle from "../utils/ProjectTitle";
import useProjectsStore from "../store";
import ShowPage from "../utils/Pagination";
import Modal from "../utils/Modal";


export default function Tasks() {
    let { tasks, setTasks, setCurrentPage, currentPage, removeData } = useProjectsStore();
    const [openModal, setOpenModal] = useState(false);
    const [showData, setShowData] = useState([])

    const handleModal = () => {
        setOpenModal(!openModal);
    }

    currentPage = currentPage.tasksCurrentPage;
    let pageItems = 3;

    console.log(showData, "showData")

    useEffect(() => {
        setShowData(tasks.slice((currentPage - 1) * pageItems, pageItems * currentPage));
    }, [currentPage, tasks, setTasks]);

    return (
        <div className="space-y-5 py-10">
            <h1 className="text-2xl text-green-600 text-center mb-7">Tasks Overview</h1>
            {showData.length > 0 ? showData.map(task => {
                const { id, name, description, status, dueDate, } = task;
                return (
                    <div key={id} className="flex flex-col md:flex-row md:items-center p-4 border border-gray-200 rounded-md space-y-3 md:space-y-0">
                        <div className="flex-1 min-w-[30%]">
                            <p>{id}.{name}</p>
                            <ProjectTitle name={"Task"} />
                        </div>
                        <div className="flex-1 min-w-[10%] md:mx-auto md:text-center">
                            <p>
                                <span className={`text-sm font-semibold ${status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
                            </p>
                            <ProjectTitle name="Status" />
                        </div>
                        <div className="flex-1">
                            <div>
                                <p>{moment(dueDate).format('DD MMMM YYYY')}</p>
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
            {/* <EditInfo /> */}
        </div>
    )
}
