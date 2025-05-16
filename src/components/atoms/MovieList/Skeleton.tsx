import React from "react";

const MovieListSkeleton: React.FC = () => {
  return (
    <div data-testid="movie-list-skeleton" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden shadow-lg">
          <div className="w-full h-64 bg-gray-300 animate-pulse"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 animate-pulse mb-2 rounded"></div>
            <div className="h-3 bg-gray-300 animate-pulse w-1/2 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieListSkeleton;
