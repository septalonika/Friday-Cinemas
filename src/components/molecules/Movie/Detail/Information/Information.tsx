import React from "react";
import { type MovieDetailInformationProps } from "../../../../../types/movies";
import MovieDetailOverview from "../../../../atoms/MovieDetail/Overview";
import MovieBio from "./Bio";
import MovieCompanies from "./Companies";
const MovieDetailInformation: React.FC<MovieDetailInformationProps> = ({ CurrentMovie, Actors, formatCurrency, getImageUrl }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <MovieDetailOverview CurrentMovie={CurrentMovie} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <MovieBio CurrentMovie={CurrentMovie} Actors={Actors} formatCurrency={formatCurrency} />
        <MovieCompanies CurrentMovie={CurrentMovie} getImageUrl={getImageUrl} />
      </div>
    </div>
  );
};

export default MovieDetailInformation;
