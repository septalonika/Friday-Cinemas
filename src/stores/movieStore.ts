import { create } from "zustand";
import type { Movie, MovieStore, CategoryType } from "../types/movies";
import { fetchMovies, fetchMovieDetails, fetchMovieByKeywords } from "../composables/useTmdbFetch";

export const useMovieStore = create<MovieStore>((set, get) => ({
  movies: [],
  currentPage: 1,
  totalPages: 0,
  currentCategory: "popular",
  currentMovie: null,
  isLoading: false,
  error: null,
  isHovered: false,
  movieDetails: undefined,

  setHover(hoverState: boolean, movieDetails?: Movie) {
    set({ isHovered: hoverState, movieDetails });
  },

  fetchMoviesByCategory: async (category: CategoryType, page = 1) => {
    set({ isLoading: true, error: null, movies: [], totalPages: 0 });
    try {
      const data = await fetchMovies(category, page);
      set({
        movies: data.results,
        totalPages: data.total_pages,
        currentPage: page,
        currentCategory: category,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  fetchMovieById: async (movieId: number) => {
    set({ isLoading: true, error: null });
    try {
      const movieDetails = await fetchMovieDetails(movieId);
      set({ currentMovie: movieDetails, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  fetchMovieByKeywords: async (query: string, page = 1) => {
    set({ isLoading: true, error: null, movies: [], totalPages: 0 });
    try {
      // Pass page to your fetch function
      const data = await fetchMovieByKeywords(query, page);

      set({
        movies: data.results,
        totalPages: data.total_pages,
        currentPage: page,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  setCurrentPage: (page: number) => {
    const { currentCategory } = get();
    get().fetchMoviesByCategory(currentCategory, page);
  },

  setCurrentCategory: (category: CategoryType) => {
    get().fetchMoviesByCategory(category, 1);
  },
}));
