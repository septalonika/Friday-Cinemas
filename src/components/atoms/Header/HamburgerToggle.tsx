import React from "react";
import type { HamburgerToggleProps } from "../../../types/movies";

const HamburgerToggle: React.FC<HamburgerToggleProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="md:hidden flex items-center p-2 rounded-md hover:bg-gray-800 focus:outline-none" aria-label="Toggle menu">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
};

export default HamburgerToggle;
