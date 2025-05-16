import React from "react";
import type { MovieCardLogoProps } from "../../../../types/movies";
import MovieCardRatings from "../../../atoms/MovieCard/Ratings";

const MovieCardLogo: React.FC<MovieCardLogoProps> = ({ MovieDetails, getImageUrl }) => {
  return (
    <div className="relative aspect-[2/3] overflow-hidden">
      <img
        src={getImageUrl(MovieDetails.poster_path)}
        alt={MovieDetails.title}
        className="w-full min-h-full object-cover transition-transform duration-300 md:group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/400x600";
        }}
      />
      <MovieCardRatings MovieRatings={MovieDetails.vote_average} />
    </div>
  );
};

export default MovieCardLogo;
