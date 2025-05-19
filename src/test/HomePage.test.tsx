import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import HomePage from "../pages/Home";
import { MemoryRouter } from "react-router-dom";

describe("HomePage", () => {
  test("renders the Home component", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Look for the actual heading text rendered by Home component
    const homeElement = screen.getByText(/discover movies/i);
    expect(homeElement).toBeInTheDocument();
  });
});
