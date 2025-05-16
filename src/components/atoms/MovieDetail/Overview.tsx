import React from "react";
import type { MovieDetails } from "../../../types/movies";

const MovieDetailOverview: React.FC<{ CurrentMovie: MovieDetails }> = ({ CurrentMovie }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Overview</h2>
      <p className="text-gray-700">{CurrentMovie.overview}</p>
    </div>
  );
};

export default MovieDetailOverview;
