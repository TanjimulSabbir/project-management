import create from 'zustand';

const useProjectsStore = create((set) => ({
    projects: [],
    currentPage: 1,
    setProjects: (data) => set({ projects: data }),
    setCurrentPage: (currentPage) => set({ currentPage })

}));

export default useProjectsStore;
