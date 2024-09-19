import { create } from "zustand";

const useDataStore = create((set) => ({
  array: [],
  addArray: (data) =>
    set((state) => ({
      array: [...state.array, data],
    })),
  updateArray: (data) =>
    set((state) => ({
      array: [...state.array.filter((el) => el.id !== data.id), data].sort(
        (a, b) => a.id - b.id
      ),
    })),
  deleteArray: (id) =>
    set((state) => ({
      array: [...state.array.filter((el) => el.id !== id)],
    })),
}));

export default useDataStore;
