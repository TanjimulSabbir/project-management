import create from 'zustand';


const useProjectsStore = create((set) => ({
    projects: [],

    setProjects: (data) => set({ projects: data }),
}));

export default useProjectsStore;
