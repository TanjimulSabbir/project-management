'use client'
import TaskDetails from './TaskDetails'
import useProjectsStore from '@/app/store'

export default function Page({ params }) {
    const { tasks } = useProjectsStore();
    let content;
    if (params.id) {
        content = tasks.filter(task => task.id == params.id).map(task => <TaskDetails key={task.id} task={task} />)
    }

    return content;
}
