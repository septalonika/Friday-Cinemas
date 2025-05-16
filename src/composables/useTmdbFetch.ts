import axios from "axios";
import type { MoviesResponse, MovieDetails, CategoryType } from "../types/movies";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const fetchMovies = async (category: CategoryType, page = 1): Promise<MoviesResponse> => {
  const response = await api.get<MoviesResponse>(`/movie/${category}`, {
    params: { page },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieByKeywords = async (query: string, page = 1): Promise<MoviesResponse> => {
  const response = await api.get<MoviesResponse>(`/search/movie`, {
    params: { query, page },
  });
  return response.data;
};
