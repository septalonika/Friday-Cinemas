import React from "react";
import { type ResultProps } from "../../../types/movies";

const SearchResult: React.FC<ResultProps> = ({ Keywords }) => {
  return <h2 className="text-xl font-semibold mb-4">Search results for "{Keywords}"</h2>;
};

export default SearchResult;
