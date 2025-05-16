import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../molecules/Movie/Card";
import { useMovieStore } from "../../stores/movieStore";
import Pagination from "../atoms/Pagination";
import SearchError from "../atoms/Search/Error";
import SearchLoading from "../atoms/Search/Loading";
import SearchNoQuery from "../atoms/Search/NoQuery";
import SearchNoResult from "../atoms/Search/NoResult";
import SearchResult from "../atoms/Search/Result";

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { movies, isLoading, error, totalPages, fetchMovieByKeywords, setCurrentPage } = useMovieStore();

  // Sync store currentPage with URL page param
  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);

  useEffect(() => {
    if (query.trim()) {
      fetchMovieByKeywords(query, page);
    }
  }, [query, page, fetchMovieByKeywords]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query, page: newPage.toString() });
  };

  if (!query.trim()) {
    return <SearchNoQuery />;
  }

  if (isLoading) {
    return <SearchLoading />;
  }

  if (error) {
    return <SearchError Error={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <SearchResult Keywords={query} />

      {movies.length === 0 ? (
        <SearchNoResult Keywords={query} />
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

export default Search;
