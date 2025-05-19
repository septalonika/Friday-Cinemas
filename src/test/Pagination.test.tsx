import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Pagination from "../components/atoms/Pagination";

describe("Pagination component", () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    onPageChange.mockClear();
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  it("renders all page buttons when totalPages <= 5", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole("button", { name: i.toString() })).toBeInTheDocument();
    }
    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });

  it("renders correct buttons when currentPage is near start", () => {
    render(<Pagination currentPage={2} totalPages={10} onPageChange={onPageChange} />);

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Last" })).toBeInTheDocument();
  });

  it("renders correct buttons when currentPage is near end", () => {
    render(<Pagination currentPage={9} totalPages={10} onPageChange={onPageChange} />);

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();

    for (let i = 8; i <= 10; i++) {
      expect(screen.getByRole("button", { name: i.toString() })).toBeInTheDocument();
    }
  });

  it("renders correct buttons when currentPage is in middle", () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />);

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getAllByText("...").length).toBe(2); // left and right dots
    expect(screen.getByRole("button", { name: "Last" })).toBeInTheDocument();

    for (let i = 4; i <= 6; i++) {
      expect(screen.getByRole("button", { name: i.toString() })).toBeInTheDocument();
    }
  });

  it("disables Prev button on first page", () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(<Pagination currentPage={10} totalPages={10} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("calls onPageChange and scrolls to top when page button clicked", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

    const pageButton = screen.getByRole("button", { name: "2" });
    fireEvent.click(pageButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("calls onPageChange and scrolls to top when Prev clicked", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole("button", { name: "Prev" });
    fireEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("calls onPageChange and scrolls to top when Next clicked", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(4);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("does not call onPageChange when Prev is disabled and clicked", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole("button", { name: "Prev" });
    fireEvent.click(prevButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("does not call onPageChange when Next is disabled and clicked", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);

    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });
});
