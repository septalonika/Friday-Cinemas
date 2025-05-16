import React from "react";
import { Link } from "react-router-dom";
import type { ErrorProps } from "../../../types/movies";

const MovieDetailError: React.FC<ErrorProps> = ({ Error }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-red-500 text-center py-8">{Error}</div>
      <Link to="/" className="block text-center text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default MovieDetailError;
