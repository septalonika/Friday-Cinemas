import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMovieStore } from "../stores/movieStore";
import * as fetchModule from "../composables/useTmdbFetch";

describe("useMovieStore", () => {
  // Reset store state before each test
  beforeEach(() => {
    useMovieStore.setState({
      movies: [],
      currentPage: 1,
      totalPages: 0,
      currentCategory: "popular",
      currentMovie: null,
      isLoading: false,
      error: null,
      isHovered: false,
      movieDetails: undefined,
    });
  });

  it("should have initial state", () => {
    const state = useMovieStore.getState();
    expect(state.movies).toEqual([]);
    expect(state.currentPage).toBe(1);
    expect(state.currentCategory).toBe("popular");
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should set hover state and movie details", () => {
    const movieDetails = { id: 1, title: "Test Movie" };
    useMovieStore.getState().setHover(true, movieDetails);

    const state = useMovieStore.getState();
    expect(state.isHovered).toBe(true);
    expect(state.movieDetails).toEqual(movieDetails);

    useMovieStore.getState().setHover(false);
    expect(useMovieStore.getState().isHovered).toBe(false);
  });

  it("should fetch movies by category", async () => {
    const fakeData = {
      results: [{ id: 1, title: "Movie 1" }],
      total_pages: 5,
    };

    // Mock fetchMovies to return fakeData
    vi.spyOn(fetchModule, "fetchMovies").mockResolvedValue(fakeData);

    const store = useMovieStore.getState();

    // Call fetchMoviesByCategory
    await store.fetchMoviesByCategory("popular", 2);

    const state = useMovieStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.movies).toEqual(fakeData.results);
    expect(state.totalPages).toBe(fakeData.total_pages);
    expect(state.currentPage).toBe(2);
    expect(state.currentCategory).toBe("popular");
    expect(state.error).toBeNull();
  });

  it("should handle fetchMoviesByCategory error", async () => {
    vi.spyOn(fetchModule, "fetchMovies").mockRejectedValue(new Error("Network error"));

    const store = useMovieStore.getState();

    await store.fetchMoviesByCategory("popular");

    const state = useMovieStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Network error");
  });

  it("should fetch movie details by ID", async () => {
    const fakeDetails = { id: 123, title: "Movie Details" };

    vi.spyOn(fetchModule, "fetchMovieDetails").mockResolvedValue(fakeDetails);

    const store = useMovieStore.getState();

    await store.fetchMovieById(123);

    const state = useMovieStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.currentMovie).toEqual(fakeDetails);
    expect(state.error).toBeNull();
  });

  it("should handle fetchMovieById error", async () => {
    vi.spyOn(fetchModule, "fetchMovieDetails").mockRejectedValue(new Error("Fetch error"));

    const store = useMovieStore.getState();

    await store.fetchMovieById(123);

    const state = useMovieStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Fetch error");
  });

  it("should fetch movies by keywords", async () => {
    const fakeData = {
      results: [{ id: 42, title: "Keyword Movie" }],
      total_pages: 3,
    };

    vi.spyOn(fetchModule, "fetchMovieByKeywords").mockResolvedValue(fakeData);

    const store = useMovieStore.getState();

    await store.fetchMovieByKeywords("test query", 1);

    const state = useMovieStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.movies).toEqual(fakeData.results);
    expect(state.totalPages).toBe(fakeData.total_pages);
    expect(state.currentPage).toBe(1);
    expect(state.error).toBeNull();
  });

  it("should handle fetchMovieByKeywords error", async () => {
    vi.spyOn(fetchModule, "fetchMovieByKeywords").mockRejectedValue(new Error("Keyword fetch error"));

    const store = useMovieStore.getState();

    await store.fetchMovieByKeywords("fail");

    const state = useMovieStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Keyword fetch error");
  });

  it("should set current page and fetch movies accordingly", async () => {
    const fakeData = {
      results: [{ id: 5, title: "Page Movie" }],
      total_pages: 2,
    };

    vi.spyOn(fetchModule, "fetchMovies").mockResolvedValue(fakeData);

    const store = useMovieStore.getState();

    // Initially currentCategory is "popular"
    await store.setCurrentPage(2);

    const state = useMovieStore.getState();

    expect(state.currentPage).toBe(2);
    expect(state.movies).toEqual(fakeData.results);
  });

  it("should set current category and fetch movies accordingly", async () => {
    const fakeData = {
      results: [{ id: 10, title: "Category Movie" }],
      total_pages: 4,
    };

    vi.spyOn(fetchModule, "fetchMovies").mockResolvedValue(fakeData);

    const store = useMovieStore.getState();

    await store.setCurrentCategory("top_rated");

    const state = useMovieStore.getState();

    expect(state.currentCategory).toBe("top_rated");
    expect(state.currentPage).toBe(1);
    expect(state.movies).toEqual(fakeData.results);
  });
});
