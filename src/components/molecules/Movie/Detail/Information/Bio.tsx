import React from "react";
import { type MovieDetails } from "../../../../../types/movies";

const MovieBio: React.FC<{ CurrentMovie: MovieDetails; formatCurrency: (value: number) => string }> = ({ CurrentMovie, formatCurrency }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Details</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Status</span>
          <span className="font-medium">{CurrentMovie.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Release Date</span>
          <span className="font-medium">{new Date(CurrentMovie.release_date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Budget</span>
          <span className="font-medium">{formatCurrency(CurrentMovie.budget)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Revenue</span>
          <span className="font-medium">{formatCurrency(CurrentMovie.revenue)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieBio;
