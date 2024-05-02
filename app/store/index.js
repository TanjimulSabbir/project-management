import { create } from 'zustand';
import initialData from "../accessories/projects.json"

export const allTasks = initialData.projects.flatMap(project => project.tasks);

const useProjectsStore = create((set) => ({
    projects: [...initialData.projects],
    tasks: [...allTasks],
    currentPage: { projectCurrentPage: 1, tasksCurrentPage: 1 },
    individualPost: { project: {}, task: {} },
    // Delete
    removeId: { project: "", task: "" },

    // set data first method (push method is fast as why I'm using it)
    setProjects: (data) => set(state => (state.projects.push(data))),
    setTasks: (data) => set(state.tasks.push(data)),
    // set data second method
    // setProjects: (data) => set(state => ({ projects: [...state.projects, data] })),
    // setTasks: (data) => set(state => ({ tasks: [...state.tasks, data] })),

    // Edit data
    editProject: ({ id, updatedData }) => set(state => ({
        projects: state.projects.map(project =>
            project.id === id ? { ...project, ...updatedData } : project
        )
    })),
    editTask: ({ id, updatedData }) => set(state => ({
        tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...updatedData } : task
        )
    })),
    // Adding Member
    addMember: ({ projectId, taskId, data }) => set(state => {
        const project = state.projects.find(project => project.id == projectId);
        if (project) {
            data.forEach(item => {
                project.members[taskId].team.push(item);
                console.log(item,"from store")
            });
        }
        return { projects: [...state.projects] };
    }),


    // pagination
    setCurrentPage: ({ data, type }) => { set((state) => ({ currentPage: { ...state.currentPage, [type]: data } })) },
    setIndividualPost: ({ data, type }) => { set(state => ({ individualPost: { ...state.individualPost, [type]: data } })) },

    // delete
    removeData: ({ id, deleteType }) => set((state) => ({
        [deleteType]: state[deleteType].filter(item => item.id !== id)
    })),
    setRemoveId: ({ id, type }) => set(state => ({ removeId: { ...state.removeId, [type]: id } }))
}));

export default useProjectsStore;
