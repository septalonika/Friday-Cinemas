import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CategoryTabs from "../components/molecules/CategoryTabs";
import type { CategoryType } from "../../types/movies";

describe("CategoryTabs", () => {
  const categories = [
    { value: "now_playing", label: "Now Playing" },
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
    { value: "upcoming", label: "Upcoming" },
  ] as const;

  it("renders all category buttons with correct labels", () => {
    render(<CategoryTabs currentCategory="popular" onCategoryChange={() => {}} />);

    categories.forEach((category) => {
      expect(screen.getByRole("button", { name: category.label })).toBeInTheDocument();
    });
  });

  it("highlights the currently selected category button", () => {
    render(<CategoryTabs currentCategory="top_rated" onCategoryChange={() => {}} />);

    const selectedButton = screen.getByRole("button", { name: "Top Rated" });
    expect(selectedButton).toHaveClass("bg-blue-500");
    expect(selectedButton).toHaveClass("text-white");

    // Other buttons should not have the selected classes
    const otherButtons = categories.filter((c) => c.value !== "top_rated").map((c) => screen.getByRole("button", { name: c.label }));

    otherButtons.forEach((btn) => {
      expect(btn).toHaveClass("bg-gray-200");
      expect(btn).not.toHaveClass("bg-blue-500");
      expect(btn).not.toHaveClass("text-white");
    });
  });

  it("calls onCategoryChange with correct value when a button is clicked", () => {
    const onCategoryChange = vi.fn();

    render(<CategoryTabs currentCategory="now_playing" onCategoryChange={onCategoryChange} />);

    const popularButton = screen.getByRole("button", { name: "Popular" });
    fireEvent.click(popularButton);

    expect(onCategoryChange).toHaveBeenCalledTimes(1);
    expect(onCategoryChange).toHaveBeenCalledWith("popular");
  });
});
