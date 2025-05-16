import React from "react";
import { Link } from "react-router-dom";
import { type MovieDetailInformationProps } from "../../../../../types/movies";
import MovieDetailOverview from "../../../../atoms/MovieDetail/Overview";
import MovieBio from "./Bio";
import MovieCompanies from "./Companies";
const MovieDetailInformation: React.FC<MovieDetailInformationProps> = ({ CurrentMovie, formatCurrency, getImageUrl }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <MovieDetailOverview CurrentMovie={CurrentMovie} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <MovieBio CurrentMovie={CurrentMovie} formatCurrency={formatCurrency} />
        <MovieCompanies CurrentMovie={CurrentMovie} getImageUrl={getImageUrl} />
      </div>

      <Link to="/" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Back to Movies
      </Link>
    </div>
  );
};

export default MovieDetailInformation;
