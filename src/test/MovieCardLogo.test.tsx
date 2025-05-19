import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../components/atoms/MovieCard/Ratings", () => ({
  __esModule: true,
  default: ({ MovieRatings }: { MovieRatings: number }) => <div data-testid="ratings">{MovieRatings}</div>,
}));

import MovieCardLogo from "../components/molecules/Movie/Card/Logo";

describe("MovieCardLogo", () => {
  const mockGetImageUrl = vi.fn();
  const sampleMovieDetails = {
    poster_path: "/test-poster.jpg",
    title: "Test Movie",
    vote_average: 7.8,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetImageUrl.mockReturnValue("https://image.tmdb.org/t/p/w500/test-poster.jpg");
  });

  it("renders image with correct src and alt", () => {
    render(<MovieCardLogo MovieDetails={sampleMovieDetails} getImageUrl={mockGetImageUrl} />);

    const img = screen.getByRole("img", { name: /test movie/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://image.tmdb.org/t/p/w500/test-poster.jpg");
    expect(img).toHaveAttribute("alt", "Test Movie");

    expect(mockGetImageUrl).toHaveBeenCalledWith(sampleMovieDetails.poster_path);
  });

  it("renders MovieCardRatings with correct rating", () => {
    render(<MovieCardLogo MovieDetails={sampleMovieDetails} getImageUrl={mockGetImageUrl} />);

    const ratings = screen.getByTestId("ratings");
    expect(ratings).toHaveTextContent("7.8");
  });

  it("replaces image src with placeholder on error", () => {
    render(<MovieCardLogo MovieDetails={sampleMovieDetails} getImageUrl={mockGetImageUrl} />);

    const img = screen.getByRole("img", { name: /test movie/i });

    // Simulate image error event
    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "https://placehold.co/400x600");
  });
});
