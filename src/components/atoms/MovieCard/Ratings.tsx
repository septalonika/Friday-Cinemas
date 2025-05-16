import React from "react";
import type { MovieCardRatingsProps } from "../../../types/movies";

const MovieCardRatings: React.FC<MovieCardRatingsProps> = ({ MovieRatings }) => {
  return <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold rounded-full h-10 w-10 flex items-center justify-center">{MovieRatings.toFixed(1)}</div>;
};

export default MovieCardRatings;
