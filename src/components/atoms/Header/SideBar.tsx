import React from "react";
import { type SidebarProps } from "../../../types/movies";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, categories, currentCategory, onCategoryChange, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 transition-opacity md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Sidebar Content */}
      <div className={`absolute top-0 left-0 w-64 h-full bg-gray-900 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-blue-500">Categories</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-800 focus:outline-none" aria-label="Close sidebar">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`block w-full text-left py-2 px-4 rounded transition-colors ${currentCategory === category.value ? "bg-blue-500 text-white" : "hover:bg-gray-800"}`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
