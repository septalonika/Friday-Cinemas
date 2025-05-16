import React from "react";
import { type MovieCardProps } from "../../../types/movies";
const MovieCardInfo: React.FC<MovieCardProps> = ({ MovieDetails }) => {
  return (
    <div
      className="
            flex-grow
            min-h-[8rem]
            p-4
            md:group-hover:opacity-0
            transition-opacity duration-300
          "
    >
      <h3 className="text-lg font-semibold text-white truncate">{MovieDetails.title}</h3>
      <p className="text-gray-400 text-sm">{new Date(MovieDetails.release_date).getFullYear() || "N/A"}</p>
      <p className="text-gray-300 text-sm line-clamp-2 mt-2">{MovieDetails.overview}</p>
    </div>
  );
};

export default MovieCardInfo;
