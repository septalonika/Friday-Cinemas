import React from "react";
import { type MovieDetailBannerProps } from "../../../../types/movies";
import MovieDetailGenre from "../../../atoms/MovieDetail/Genre";
const MovieDetailBanner: React.FC<MovieDetailBannerProps> = ({ BackdropUrl, PosterUrl, CurrentMovie }) => {
  return (
    <div
      className="w-full h-[50dvh] bg-cover bg-center relative p-4 md:p-12"
      style={{
        backgroundImage: `url(${BackdropUrl})`,
        backgroundPosition: "center top",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex items-center p-4 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
          <div className="w-40 md:w-64 flex-shrink-0">
            <img src={PosterUrl} alt={CurrentMovie.title} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col justify-center text-white">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{CurrentMovie.title}</h1>
            {CurrentMovie.tagline && <p className="text-gray-300 italic mb-4">{CurrentMovie.tagline}</p>}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-yellow-400 flex items-center gap-1">⭐ {CurrentMovie.vote_average.toFixed(1)}</span>
              <span>{new Date(CurrentMovie.release_date).getFullYear()}</span>
              <span>{CurrentMovie.runtime} min</span>
            </div>
            <MovieDetailGenre CurrentMovie={CurrentMovie} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailBanner;
