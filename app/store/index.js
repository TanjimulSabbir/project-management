import create from 'zustand';

const useProjectsStore = create((set) => ({
    projects: [],
    tasks: [],
    currentPage: { projectCurrentPage: 1, tasksCurrentPage: 1 },
    individualPost: { project: {}, task: {} },

    setProjects: (data) => set({ projects: data }),
    setTasks: (data) => set({ projects: data }),
    setCurrentPage: ({ data, type }) => { set((state) => ({ currentPage: { ...state.currentPage, [type]: data } })) },
    setTasks: (data) => set({ tasks: data }),
    setIndividualPost: ({ data, type }) => { set(state => ({ ...state.individualPost, [type]: data })) }
}));

export default useProjectsStore;
