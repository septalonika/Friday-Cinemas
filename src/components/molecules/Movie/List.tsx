import { useSearchParams } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import MovieCard from "./Card";
import { useMovieStore } from "../../../stores/movieStore";
import type { MovieListProps } from "../../../types/movies";
import Pagination from "../../atoms/Pagination";
import MovieListSkeleton from "../../atoms/MovieList/Skeleton";
import type { CategoryType } from "../../../types/movies";

const MovieList: React.FC<MovieListProps> = ({ category: propCategory }) => {
  const { movies, isLoading, error, totalPages, fetchMoviesByCategory, setCurrentPage } = useMovieStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || propCategory;
  const page = parseInt(searchParams.get("page") || "1", 10);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMoviesByCategory(category as CategoryType, page);
  }, [category, page, fetchMoviesByCategory]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ category, page: newPage.toString() });
  };

  return (
    <div ref={topRef} className="space-y-8">
      {isLoading && movies.length === 0 ? (
        <MovieListSkeleton />
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} MovieDetails={movie} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages > 500 ? 500 : totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default MovieList;
