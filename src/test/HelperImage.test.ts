import { describe, it, expect, beforeAll } from "vitest";
import { getImageUrl } from "../helper/image";

beforeAll(() => {
  Object.assign(import.meta.env as unknown as Record<string, string>, {
    VITE_IMAGE_BASE_URL: "https://image.tmdb.org/t/p/",
  });
});

describe("getImageUrl", () => {
  it("returns placeholder when path is null", () => {
    expect(getImageUrl(null)).toBe("https://placehold.co/400x600");
  });

  it("returns placeholder when path is undefined", () => {
    expect(getImageUrl(undefined)).toBe("https://placehold.co/400x600");
  });

  it("returns placeholder when path is empty string", () => {
    expect(getImageUrl("")).toBe("https://placehold.co/400x600");
  });

  it("returns correct image url with default size", () => {
    expect(getImageUrl("/abc.jpg")).toBe("https://image.tmdb.org/t/p/w500/abc.jpg");
  });

  it("returns correct image url with custom size", () => {
    expect(getImageUrl("/xyz.png", "original")).toBe("https://image.tmdb.org/t/p/original/xyz.png");
  });
});
