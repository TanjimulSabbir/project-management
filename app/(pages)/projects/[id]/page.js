'use client'
import useProjectsStore from "@/app/store";
import ProjectDetails from "../ProjectDetails";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const { projects, tasks, removeData } = useProjectsStore();
    const [showProjectData, setShowProjectData] = useState([]);
    
    useEffect(() => {
        setShowProjectData(projects)
    }, [projects, tasks, removeData]);

    let content;
    if (params.id) {
        content = showProjectData.filter(project => project.id == params.id).map(project => <ProjectDetails key={project.id} project={project} />)
    }
    return content;
}
