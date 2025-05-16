import React from "react";
import { type MovieDetails, type Actors } from "../../../../../types/movies";

const MovieBio: React.FC<{ CurrentMovie: MovieDetails; Actors: Actors[]; formatCurrency: (value: number) => string }> = ({ CurrentMovie, Actors, formatCurrency }) => {
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

      <h2 className="text-xl font-bold mb-4 mt-4">Starrings</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Actors.map((actor) => (
          <div key={actor.id} className="bg-white rounded-lg shadow-lg ">
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className="w-full h-40 rounded-xl object-cover md:h-48 lg:h-64"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x400";
              }}
            />
            <div className="flex flex-col items-center justify-center mt-4 p-4">
              <span className="text-gray-600 flex">{actor.name}</span>
              <span className="font-medium text-center">{actor.character}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieBio;
