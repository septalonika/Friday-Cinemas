import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieCardInfo from "../components/atoms/MovieCard/Info";
import MovieCardOverlay from "../components/atoms/MovieCard/Overlay";
import MovieCardRatings from "../components/atoms/MovieCard/Ratings";
import MovieCard from "../components/molecules/Movie/Card";
import { MemoryRouter } from "react-router-dom";

// Mock movie data
const mockMovieDetails = {
  id: 123,
  title: "Inception",
  release_date: "2010-07-16",
  overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
  poster_path: "/poster.jpg",
  vote_average: 8.8,
};

const mockMovieDetailsNoDate = {
  title: "Unknown Movie",
  release_date: "",
  overview: "No release date available.",
};

describe("MovieCardInfo", () => {
  it("renders title, release year, and overview", () => {
    render(<MovieCardInfo MovieDetails={mockMovieDetails} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText(mockMovieDetails.overview)).toBeInTheDocument();
  });

  it("renders 'N/A' if release_date is invalid or empty", () => {
    render(<MovieCardInfo MovieDetails={mockMovieDetailsNoDate} />);

    expect(screen.getByText("Unknown Movie")).toBeInTheDocument();
    expect(screen.getByText("N/A")).toBeInTheDocument();
    expect(screen.getByText(mockMovieDetailsNoDate.overview)).toBeInTheDocument();
  });
});

describe("MovieCardOverlay", () => {
  it("renders title, release year, and overview", () => {
    render(<MovieCardOverlay MovieDetails={mockMovieDetails} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText(mockMovieDetails.overview)).toBeInTheDocument();
  });

  it("renders 'N/A' if release_date is invalid or empty", () => {
    render(<MovieCardOverlay MovieDetails={mockMovieDetailsNoDate} />);

    expect(screen.getByText("Unknown Movie")).toBeInTheDocument();
    expect(screen.getByText("N/A")).toBeInTheDocument();
    expect(screen.getByText(mockMovieDetailsNoDate.overview)).toBeInTheDocument();
  });
});

describe("MovieCardRatings", () => {
  it("renders rating rounded to one decimal place", () => {
    render(<MovieCardRatings MovieRatings={7.856} />);
    expect(screen.getByText("7.9")).toBeInTheDocument();
  });

  it("renders rating correctly for integer values", () => {
    render(<MovieCardRatings MovieRatings={8} />);
    expect(screen.getByText("8.0")).toBeInTheDocument();
  });
});

const mockGetImageUrl = vi.fn((path: string) => `https://image.tmdb.org/t/p/w500${path}`);

describe("MovieCard", () => {
  it("renders and links to the correct movie page", () => {
    render(
      <MemoryRouter>
        <MovieCard MovieDetails={mockMovieDetails} />
      </MemoryRouter>
    );

    // Check link href
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/movie/${mockMovieDetails.id}`);

    // Check title rendered by MovieCardInfo or MovieCardOverlay
    expect(screen.getAllByText(/inception/i).length).toBeGreaterThan(0);

    // Check overview text
    expect(screen.getAllByText(/a thief who steals corporate secrets/i).length).toBeGreaterThan(0);
  });
});
