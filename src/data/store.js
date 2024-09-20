import { create } from "zustand";

const useDataStore = create((set) => ({
  videoData: [],
  addArray: (data) =>
    set((state) => ({
      videoData: [...state.videoData, data],
    })),
  updateArray: (data) =>
    set((state) => ({
      videoData: [
        ...state.videoData.filter((el) => el.id !== data.id),
        data,
      ].sort((a, b) => a.id - b.id),
    })),
  deleteArray: (id) =>
    set((state) => ({
      videoData: [...state.videoData.filter((el) => el.id !== id)],
    })),
  updateSubs: (data) =>
    set(() => ({
      videoData: data,
    })),
}));

export default useDataStore;
