import { create } from "zustand";

export const useDataStore = create((set) => ({
    user: null,
    loading: null,
    error: null,

    setUser: (data) => {
        set({ user: data });
    },
}));
