import { describe, it, expect, beforeEach, afterEach } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { api, fetchMovieByKeywords } from "../composables/useTmdbFetch";
import { fetchMovies, fetchMovieDetails, fetchActors } from "../composables/useTmdbFetch";

describe("fetchMovieByKeywords", () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it("fetches movies successfully", async () => {
    const mockData = {
      page: 1,
      results: [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ],
      total_pages: 1,
      total_results: 2,
    };

    mock.onGet("/search/movie").reply(200, mockData);

    const data = await fetchMovieByKeywords("test");

    expect(data).toEqual(mockData);
  });

  it("handles error response gracefully", async () => {
    mock.onGet(/\/search\/movie/).reply(500);

    await expect(fetchMovieByKeywords("fail")).rejects.toThrow();
  });
});

describe("fetchMovies", () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it("fetches movies by category successfully", async () => {
    const mockData = {
      page: 1,
      results: [{ id: 1, title: "Movie 1" }],
      total_pages: 1,
      total_results: 1,
    };

    mock.onGet(/\/movie\/popular/).reply(200, mockData);

    const data = await fetchMovies("popular");

    expect(data).toEqual(mockData);
  });

  it("throws on error", async () => {
    mock.onGet(/\/movie\/popular/).reply(500);

    await expect(fetchMovies("popular")).rejects.toThrow();
  });
});

describe("fetchMovieDetails", () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it("fetches movie details successfully", async () => {
    const mockData = {
      id: 1,
      title: "Movie 1",
      overview: "Overview",
    };

    mock.onGet("/movie/1").reply(200, mockData);

    const data = await fetchMovieDetails(1);

    expect(data).toEqual(mockData);
  });

  it("throws on error", async () => {
    mock.onGet("/movie/1").reply(500);

    await expect(fetchMovieDetails(1)).rejects.toThrow();
  });
});

describe("fetchActors", () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it("fetches actors successfully", async () => {
    const mockData = {
      id: 123,
      cast: [
        {
          adult: false,
          gender: 2,
          id: 1,
          known_for_department: "Acting",
          name: "Actor One",
          original_name: "Actor One",
          popularity: 10,
          profile_path: "/path.jpg",
          cast_id: 5,
          character: "Hero",
          credit_id: "abc123",
          order: 0,
        },
      ],
      crew: [],
    };

    mock.onGet(`/movie/123/credits`).reply(200, mockData);

    const data = await fetchActors(123);

    expect(data).toEqual(mockData);
  });

  it("throws on error response", async () => {
    mock.onGet(`/movie/123/credits`).reply(500);

    await expect(fetchActors(123)).rejects.toThrow();
  });
});
