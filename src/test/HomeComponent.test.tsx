import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

// 1. Mock child components to isolate Home tests
vi.mock("../components/molecules/CategoryTabs", () => ({
  __esModule: true,
  default: ({ currentCategory, onCategoryChange }: any) => (
    <div>
      <button onClick={() => onCategoryChange("popular")}>Change to Popular</button>
      <div>Current: {currentCategory}</div>
    </div>
  ),
}));

vi.mock("../components/molecules/Movie/List", () => ({
  __esModule: true,
  default: ({ category }: any) => <div>MovieList for {category}</div>,
}));

// 2. Mock useMovieStore hook before importing Home
const setCurrentCategoryMock = vi.fn();

vi.mock("../stores/movieStore", () => ({
  useMovieStore: () => ({
    currentCategory: "now_playing",
    setCurrentCategory: setCurrentCategoryMock,
  }),
}));

// 3. Mock react-router-dom BEFORE importing useSearchParams and Home
const mockSetSearchParams = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(() => [
      {
        get: (key: string) => (key === "category" ? "now_playing" : null),
      },
      mockSetSearchParams,
    ]),
  };
});

import Home from "../components/organisms/Home";
import { useSearchParams } from "react-router-dom";

// 4. Cast useSearchParams to vi.Mock for typings and mocking
const mockedUseSearchParams = useSearchParams as unknown as ReturnType<typeof vi.fn>;

describe("Home component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders heading, CategoryTabs, and MovieList", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/discover movies/i)).toBeInTheDocument();
    expect(screen.getByText(/current: now_playing/i)).toBeInTheDocument();
    expect(screen.getByText(/movielist for now_playing/i)).toBeInTheDocument();
  });

  it("calls setCurrentCategory if URL category differs from store on mount", () => {
    mockedUseSearchParams.mockReturnValueOnce([{ get: (key: string) => (key === "category" ? "popular" : null) }, mockSetSearchParams]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(setCurrentCategoryMock).toHaveBeenCalledWith("popular");
  });

  it("sets search params if URL category is missing", () => {
    mockedUseSearchParams.mockReturnValueOnce([{ get: () => null }, mockSetSearchParams]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(mockSetSearchParams).toHaveBeenCalledWith({ category: "now_playing" });
  });

  it("handles category change via CategoryTabs", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const button = screen.getByText("Change to Popular");
    fireEvent.click(button);

    expect(setCurrentCategoryMock).toHaveBeenCalledWith("popular");
    expect(mockSetSearchParams).toHaveBeenCalledWith({ category: "popular", page: "1" });
  });
});
