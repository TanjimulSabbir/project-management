import create from 'zustand';

const useProjectsStore = create((set) => ({
    projects: [],
    tasks: [],
    currentPage: 1,
    setProjects: (data) => set({ projects: data }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setTasks: (data) => set({ tasks: data })

}));

export default useProjectsStore;
