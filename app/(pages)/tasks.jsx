"use client"
import { useEffect, useState } from "react";
import useProjectsStore from "@/app/store";
import moment from "moment";
import Options from "./Options";
import "./projects.css"
import ProjectTitle from "@/app/utils/projectTitle";
import ShowPage from "@/app/utils/Pagination";
import Modal from "@/app/utils/Modal";
import EditInfo from "./EditInfo";

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
        <div className="space-y-3 py-10">
            {showData.length > 0 ? showData.map(task => {
                const { id, name, description, status, dueDate, } = task;
                return (
                    <div key={id} className="flex items-center p-4 border border-gray-200 rounded-md">
                        <div className="flex-1 min-w-[30%]">
                            <p>{id}. {name}</p>
                            <ProjectTitle name="Development" />
                        </div>
                        <div className="flex-1">
                            <p>
                                <span>{status}</span>
                            </p>
                            <ProjectTitle name="status" />
                        </div>
                        {/* <div className="flex-1">
                            <p>${estimated_total_budget}</p>
                            <ProjectTitle name="Budgets" />
                        </div> */}
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
