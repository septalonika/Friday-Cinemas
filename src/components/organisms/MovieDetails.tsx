import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieStore } from "../../stores/movieStore";
import { getImageUrl } from "../../helper/image";
import MovieDetailSkeleton from "../atoms/MovieDetail/Sekeleton";
import MovieDetailError from "../atoms/MovieDetail/Error";
import MovieDetailBanner from "../molecules/Movie/Detail/Banner";
import MovieDetailInformation from "../molecules/Movie/Detail/Information/Information";
import { Link } from "react-router-dom";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentMovie, actors, isLoading, error, fetchMovieById, fetchMovieActors, fetchMoviesByCategory } = useMovieStore();

  useEffect(() => {
    if (id) {
      fetchMovieById(parseInt(id, 10));
      fetchMovieActors(parseInt(id, 10));
    }
  }, [id, fetchMovieById]);

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (error) {
    return <MovieDetailError Error={error} />;
  }

  if (!currentMovie) {
    return null;
  }
  const backdropUrl = getImageUrl(currentMovie.backdrop_path);
  const posterUrl = getImageUrl(currentMovie.poster_path);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full">
      <Link
        to="/?category=popular"
        className="absolute top-[14%] right-[10%] z-10 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => fetchMoviesByCategory("popular", 1)}
      >
        Back to Movies
      </Link>
      <MovieDetailBanner BackdropUrl={backdropUrl} PosterUrl={posterUrl} CurrentMovie={currentMovie} />
      <MovieDetailInformation CurrentMovie={currentMovie} Actors={actors} formatCurrency={formatCurrency} getImageUrl={getImageUrl} />
    </div>
  );
};

export default MovieDetails;
