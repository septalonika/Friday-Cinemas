import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMovieStore } from "../stores/movieStore";
import * as fetchModule from "../composables/useTmdbFetch";
import type { Movie, MovieDetails, MoviesResponse, CategoryType, Actors } from "../types/movies";

describe("useMovieStore", () => {
  // Reset store state before each test
  beforeEach(() => {
    useMovieStore.setState({
      movies: [],
      currentPage: 1,
      totalPages: 0,
      currentCategory: "popular" as CategoryType,
      currentMovie: null,
      isLoading: false,
      error: null,
      isHovered: false,
      movieDetails: undefined,
      actors: [],
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
    // Create a properly typed Movie object
    const movieDetails: Movie = {
      id: 1,
      title: "Test Movie",
      poster_path: "/poster.jpg",
      backdrop_path: "/backdrop.jpg",
      overview: "A test movie description",
      release_date: "2023-01-01",
      vote_average: 8.5,
      vote_count: 100,
      genre_ids: [28, 12],
    };

    useMovieStore.getState().setHover(true, movieDetails);

    const state = useMovieStore.getState();
    expect(state.isHovered).toBe(true);
    expect(state.movieDetails).toEqual(movieDetails);

    useMovieStore.getState().setHover(false);
    expect(useMovieStore.getState().isHovered).toBe(false);
  });

  it("should fetch movies by category", async () => {
    // Create a properly typed MoviesResponse object
    const fakeData: MoviesResponse = {
      results: [
        {
          id: 1,
          title: "Movie 1",
          poster_path: "/poster1.jpg",
          backdrop_path: "/backdrop1.jpg",
          overview: "Overview for movie 1",
          release_date: "2023-01-01",
          vote_average: 8.0,
          vote_count: 150,
          genre_ids: [28, 12, 14],
        },
      ],
      total_pages: 5,
      page: 2,
      total_results: 100,
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
    // Create a properly typed MovieDetails object
    const fakeDetails: MovieDetails = {
      id: 123,
      title: "Movie Details",
      poster_path: "/poster123.jpg",
      backdrop_path: "/backdrop123.jpg",
      overview: "Detailed overview of the movie",
      release_date: "2023-03-15",
      vote_average: 7.5,
      vote_count: 200,
      genre_ids: [28, 53],
      genres: [
        { id: 28, name: "Action" },
        { id: 53, name: "Thriller" },
      ],
      runtime: 120,
      tagline: "An exciting tagline",
      status: "Released",
      budget: 100000000,
      revenue: 350000000,
      production_companies: [
        {
          id: 1,
          logo_path: "/company1.png",
          name: "Studio 1",
          origin_country: "US",
        },
      ],
    };

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
    // Create a properly typed MoviesResponse object
    const fakeData: MoviesResponse = {
      results: [
        {
          id: 42,
          title: "Keyword Movie",
          poster_path: "/poster42.jpg",
          backdrop_path: "/backdrop42.jpg",
          overview: "A movie found by keywords",
          release_date: "2022-11-10",
          vote_average: 6.8,
          vote_count: 90,
          genre_ids: [35, 18],
        },
      ],
      total_pages: 3,
      page: 1,
      total_results: 25,
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
    // Create a properly typed MoviesResponse object
    const fakeData: MoviesResponse = {
      results: [
        {
          id: 5,
          title: "Page Movie",
          poster_path: "/poster5.jpg",
          backdrop_path: "/backdrop5.jpg",
          overview: "A movie on page 2",
          release_date: "2023-05-20",
          vote_average: 7.2,
          vote_count: 120,
          genre_ids: [12, 16],
        },
      ],
      total_pages: 2,
      page: 2,
      total_results: 30,
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
    // Create a properly typed MoviesResponse object
    const fakeData: MoviesResponse = {
      results: [
        {
          id: 10,
          title: "Category Movie",
          poster_path: "/poster10.jpg",
          backdrop_path: "/backdrop10.jpg",
          overview: "A top rated movie",
          release_date: "2023-02-15",
          vote_average: 9.0,
          vote_count: 500,
          genre_ids: [18, 80],
        },
      ],
      total_pages: 4,
      page: 1,
      total_results: 75,
    };

    vi.spyOn(fetchModule, "fetchMovies").mockResolvedValue(fakeData);

    const store = useMovieStore.getState();

    await store.setCurrentCategory("top_rated");

    const state = useMovieStore.getState();

    expect(state.currentCategory).toBe("top_rated");
    expect(state.currentPage).toBe(1);
    expect(state.movies).toEqual(fakeData.results);
  });

  it("should fetch movie actors", async () => {
    // Create properly typed Actors array
    const fakeActors: Actors[] = [
      {
        id: 1,
        name: "Actor One",
        character: "Character One",
        profile_path: "/actor1.jpg",
        order: 0,
        cast_id: 1,
        credit_id: "credit123",
        adult: false,
        gender: 1,
        known_for_department: "Acting",
        original_name: "Actor One",
        popularity: 25.5,
      },
      {
        id: 2,
        name: "Actor Two",
        character: "Character Two",
        profile_path: "/actor2.jpg",
        order: 1,
        cast_id: 2,
        credit_id: "credit456",
        adult: false,
        gender: 2,
        known_for_department: "Acting",
        original_name: "Actor Two",
        popularity: 45.2,
      },
    ];

    vi.spyOn(fetchModule, "fetchActors").mockResolvedValue({ cast: fakeActors });

    const store = useMovieStore.getState();

    await store.fetchMovieActors(123);

    const state = useMovieStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.actors).toEqual(fakeActors);
    expect(state.error).toBeNull();
  });

  it("should handle fetchMovieActors error", async () => {
    vi.spyOn(fetchModule, "fetchActors").mockRejectedValue(new Error("Actors fetch error"));

    const store = useMovieStore.getState();

    await store.fetchMovieActors(123);

    const state = useMovieStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Actors fetch error");
  });
});
