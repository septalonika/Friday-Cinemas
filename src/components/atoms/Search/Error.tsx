import React from "react";
import type { ErrorProps } from "../../../types/movies";

const SearchError: React.FC<ErrorProps> = ({ Error }) => {
  return <div className="container mx-auto p-4 text-center text-red-500">Error: {Error}</div>;
};

export default SearchError;
