'use client'
import useProjectsStore from "@/app/store";
import ProjectDetails from "../ProjectDetails";

export default function Page({ params }) {
    const { projects } = useProjectsStore();
    let content;
    if (params.id) {
        content = projects.filter(project => project.id == params.id).map(project => <ProjectDetails key={project.id} project={project} />)
    }
    return content;
}
