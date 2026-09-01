import { create } from "zustand";

export type MovieListType =
  | "popular"
  | "top_rated"
  | "now_playing"
  | "upcoming";

interface FilterState {
  searchTerm: string;
  listMode: MovieListType;
  currentPage: number;

  setSearchTerm: (term: string) => void;
  setListMode: (mode: MovieListType) => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: "",
  listMode: "popular",
  currentPage: 1,

  setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
  setListMode: (mode) => set({ listMode: mode, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  resetFilters: () =>
    set({ searchTerm: "", listMode: "popular", currentPage: 1 }),
}));
