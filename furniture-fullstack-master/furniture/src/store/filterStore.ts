import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  categories: string[];
  types: string[];
};

const initialState: State = {
  categories: [],
  types: [],
};

type Actions = {
  setFilters: (categories: string[], types: string[]) => void;
  clearFilters: () => void;
};

const useFilterStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,

      setFilters: (categories, types) => set({ categories, types }),

      clearFilters: () => set(initialState),
    }),
    {
      name: "product-filters", // key for sessionStorage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useFilterStore;
