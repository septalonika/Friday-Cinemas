import React from "react";
import { Link } from "react-router-dom";

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <h1 className="sm:text-sm md:text-md lg:text-xl font-bold text-blue-500 ">
        Friday<span className="text-red-600 underline">Cine</span>
      </h1>
    </Link>
  );
};

export default Logo;
