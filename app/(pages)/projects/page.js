"use client"
import Projects from "./projects"
import Tasks from "./tasks"

export default function page() {
    return (
        <div className="container mx-auto">
            <Projects />
            <Tasks/>
        </div>
    )
}
