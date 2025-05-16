import React from "react";
import { type MovieCardProps } from "../../../types/movies";

const MovieCardOverlay: React.FC<MovieCardProps> = ({ MovieDetails }) => {
  return (
    <div
      className="
          absolute left-0 bottom-0 w-full h-full
          bg-black/80 px-4 py-6 flex flex-col items-center justify-center
          translate-y-full md:group-hover:translate-y-0
          transition-transform duration-300 ease-in-out
          z-10 rounded-lg
          max-md:hidden md:flex
        "
    >
      <h3 className="text-lg font-semibold text-white text-center">{MovieDetails.title}</h3>
      <p className="text-gray-400 text-sm">{new Date(MovieDetails.release_date).getFullYear() || "N/A"}</p>
      <p className="text-gray-300 text-sm mt-2 text-center">{MovieDetails.overview}</p>
    </div>
  );
};

export default MovieCardOverlay;
