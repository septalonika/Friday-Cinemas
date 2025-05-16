import React from "react";
import { type MovieDetails } from "../../../../../types/movies";

const MovieCompanies: React.FC<{ CurrentMovie: MovieDetails; getImageUrl: (path: string) => string }> = ({ CurrentMovie, getImageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Production Companies</h2>
      <div className="space-y-4">
        {CurrentMovie.production_companies.length > 0 ? (
          CurrentMovie.production_companies.map((company) => (
            <div key={company.id} className="flex items-center gap-3">
              {company.logo_path ? (
                <img
                  src={getImageUrl(company.logo_path)}
                  alt={company.name}
                  className="h-14 w-14 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x400";
                  }}
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-xs">{company.name.charAt(0)}</span>
                </div>
              )}
              <span>{company.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No production companies listed</p>
        )}
      </div>
    </div>
  );
};

export default MovieCompanies;
