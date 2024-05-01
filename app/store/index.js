import create from 'zustand';
import initialData from "../accessories/projects.json"

export const allTasks = initialData.projects.flatMap(project => project.tasks);

const useProjectsStore = create((set) => ({
    projects: [...initialData.projects],
    tasks: [...allTasks],
    currentPage: { projectCurrentPage: 1, tasksCurrentPage: 1 },
    individualPost: { project: {}, task: {} },

    // Delete
    removeId: { project: "", task: "" },

    setProjects: (data) => set({ projects: data }),
    setTasks: (data) => set({ projects: data }),
    setCurrentPage: ({ data, type }) => { set((state) => ({ currentPage: { ...state.currentPage, [type]: data } })) },
    setTasks: (data) => set({ tasks: data }),
    setIndividualPost: ({ data, type }) => { set(state => ({ ...state.individualPost, [type]: data })) },

    // delete
    removeData: ({ id, deleteType }) => set((state) => ({
        [deleteType]: state[deleteType].filter(item => item.id !== id)
    })),
    setRemoveId: ({ id, type }) => set(state => ({ ...state.removeId, [type]: id }))
}));

export default useProjectsStore;
