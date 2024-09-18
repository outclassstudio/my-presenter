import { create } from "zustand";

const useDataStore = create((set) => ({
  array: [],
  addArray: (data) =>
    set((state) => ({
      array: [...state.array, data],
    })),
}));

export default useDataStore;
