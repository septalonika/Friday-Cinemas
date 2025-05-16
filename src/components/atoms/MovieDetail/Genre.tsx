import React from "react";
import type { MovieDetails } from "../../../types/movies";
const MovieDetailGenre: React.FC<{ CurrentMovie: MovieDetails }> = ({ CurrentMovie }) => {
  return (
    <div className="mb-4">
      {CurrentMovie.genres.map((genre) => (
        <span key={genre.id} className="inline-block bg-blue-500 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2">
          {genre.name}
        </span>
      ))}
    </div>
  );
};
export default MovieDetailGenre;
