import { useEffect } from "react";
import ProjectsData from "../../accessories/projects.json"
import useProjectsStore from "@/app/store";
import moment from "moment";
import Options from "./Options";
import "./projects.css"
import ProjectTitle from "@/app/utils/projectTitle";
import ShowPage from "@/app/utils/Pagination";

export default function Projects() {
    let { projects, setProjects, setCurrentPage, currentPage } = useProjectsStore();

    currentPage = currentPage.projectCurrentPage
    let pageItems = 3;

    console.log(currentPage, "from projects")
    const allTasks = ProjectsData.projects.flatMap(project => project.tasks);
    console.log(allTasks,"allTasks")
    useEffect(() => {
        setProjects(ProjectsData.projects.slice((currentPage - 1) * pageItems, pageItems * currentPage));
    }, [currentPage]);

    return (
        <div className="space-y-3 py-10">
            {projects.map(project => {
                const { id, name, description, status, dueDate, tasks, estimated_total_budget } = project;
                return (
                    <div key={id} className="flex items-center p-4 border border-gray-200 rounded-md">
                        <div className="flex-1 min-w-[30%]">
                            <p>{name}</p>
                            <ProjectTitle name="Development" />
                        </div>
                        <div className="flex-1">
                            <p>
                                <span>{tasks.filter(task => task.status === "Completed").length || 0}</span>/
                                <span>{tasks.length}</span>
                            </p>
                            <ProjectTitle name="Tasks" />
                        </div>
                        <div className="flex-1">
                            <p>${estimated_total_budget}</p>
                            <ProjectTitle name="Budgets" />
                        </div>
                        <div className="flex-1">
                            <div>
                                <p>{moment(dueDate).format('DD MMMM YYYY')}</p>
                                <ProjectTitle name="Due Date" />
                            </div>
                        </div>
                        <Options />
                    </div>
                )
            })}
            <ShowPage
                length={ProjectsData.projects.length}
                pageItems={pageItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                type="projectCurrentPage"
            />
        </div>
    )
}
