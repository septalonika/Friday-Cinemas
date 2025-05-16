import React from "react";
import type { ResultProps } from "../../../types/movies";

const SearchNoResult: React.FC<ResultProps> = ({ Keywords }) => {
  return <div className="text-center py-8 text-gray-500">No results found for "{Keywords}".</div>;
};

export default SearchNoResult;
