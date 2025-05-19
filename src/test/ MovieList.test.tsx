import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MovieList from "../components/molecules/Movie/List";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock the movie store module BEFORE importing useMovieStore
vi.mock("../stores/movieStore", () => ({
  useMovieStore: vi.fn(),
}));

// Mock react-router-dom useSearchParams BEFORE importing
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

// MOCK MovieCard to render movie title directly
vi.mock("../components/molecules/Movie/Card", () => ({
  __esModule: true,
  default: ({ MovieDetails }: { MovieDetails: { title: string } }) => <div>{MovieDetails.title}</div>,
}));

import { useMovieStore } from "../stores/movieStore";
import { useSearchParams } from "react-router-dom";

const mockedUseMovieStore = useMovieStore as unknown as ReturnType<typeof vi.fn>;
const mockedUseSearchParams = useSearchParams as unknown as ReturnType<typeof vi.fn>;

describe("MovieList component", () => {
  const mockFetchMoviesByCategory = vi.fn();
  const mockSetCurrentPage = vi.fn();
  const mockSetSearchParams = vi.fn();

  const movies = [
    { id: 1, title: "Movie 1", release_date: "2020-01-01", overview: "Overview 1", vote_average: 7.5 },
    { id: 2, title: "Movie 2", release_date: "2021-01-01", overview: "Overview 2", vote_average: 8.1 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseMovieStore.mockReturnValue({
      movies: [],
      isLoading: true,
      error: null,
      totalPages: 1,
      fetchMoviesByCategory: mockFetchMoviesByCategory,
      setCurrentPage: mockSetCurrentPage,
    });

    mockedUseSearchParams.mockReturnValue([{ get: () => null }, mockSetSearchParams]);
  });

  it("renders loading skeleton when loading and no movies", () => {
    render(
      <MemoryRouter>
        <MovieList category="popular" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("movie-list-skeleton")).toBeInTheDocument();
  });

  it("renders error message when error exists", () => {
    mockedUseMovieStore.mockReturnValueOnce({
      movies: [],
      isLoading: false,
      error: "Failed to load",
      totalPages: 1,
      fetchMoviesByCategory: mockFetchMoviesByCategory,
      setCurrentPage: mockSetCurrentPage,
    });

    render(
      <MemoryRouter>
        <MovieList category="popular" />
      </MemoryRouter>
    );

    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  it("renders movies and pagination", () => {
    mockedUseMovieStore.mockReturnValueOnce({
      movies,
      isLoading: false,
      error: null,
      totalPages: 10,
      fetchMoviesByCategory: mockFetchMoviesByCategory,
      setCurrentPage: mockSetCurrentPage,
    });

    mockedUseSearchParams.mockReturnValueOnce([
      {
        get: (key: string) => {
          if (key === "category") return "popular";
          if (key === "page") return "1";
          return null;
        },
      },
      mockSetSearchParams,
    ]);

    render(
      <MemoryRouter>
        <MovieList category="popular" />
      </MemoryRouter>
    );

    // Movie titles should be rendered by mocked MovieCard
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();

    // Pagination next button should be enabled
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeEnabled();

    // Simulate clicking next page
    fireEvent.click(nextButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({ category: "popular", page: "2" });
  });

  it("calls fetchMoviesByCategory and setCurrentPage on mount and param change", () => {
    mockedUseSearchParams.mockReturnValue([{ get: (key: string) => (key === "category" ? "popular" : "1") }, mockSetSearchParams]);

    render(
      <MemoryRouter>
        <MovieList category="popular" />
      </MemoryRouter>
    );

    expect(mockFetchMoviesByCategory).toHaveBeenCalledWith("popular", 1);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });
});
