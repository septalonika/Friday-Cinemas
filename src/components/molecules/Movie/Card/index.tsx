import React from "react";
import { Link } from "react-router-dom";
import type { MovieCardProps } from "../../../../types/movies";
import { getImageUrl } from "../../../../helper/image";
import MovieCardOverlay from "../../../atoms/MovieCard/Overlay";
import MovieCardInfo from "../../../atoms/MovieCard/Info";
import MovieCardLogo from "./Logo";

const MovieCard: React.FC<MovieCardProps> = ({ MovieDetails }) => {
  return (
    <Link to={`/movie/${MovieDetails.id}`} className="group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
        <MovieCardLogo MovieDetails={MovieDetails} getImageUrl={getImageUrl} />
        <MovieCardInfo MovieDetails={MovieDetails} />
        <MovieCardOverlay MovieDetails={MovieDetails} />
      </div>
    </Link>
  );
};

export default MovieCard;
