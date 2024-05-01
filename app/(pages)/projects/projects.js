import { useEffect } from "react";
import ProjectsData from "../../accessories/projects.json"
import useProjectsStore from "@/app/store";

export default function Projects() {
    const { projects, setProjects } = useProjectsStore();

    useEffect(() => {
        // Fetch data and set it in the store
        setProjects(ProjectsData.projects);
    }, [projects]);

    return (
        <div>
            {projects.map(project => {
                const { id, name, description, status, dueDate } = project;
                return (
                    <div key={id} className="py-4 bg-gray-200 shadow-xl">
                        <p>{name}</p>
                        <p>{status}</p>
                        <p>{dueDate}</p>
                    </div>
                )
            })}
        </div>
    )
}
