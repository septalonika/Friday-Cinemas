import React from "react";
import type { CategoryTabsProps, CategoryType } from "../../types/movies";

const CategoryTabs: React.FC<CategoryTabsProps> = ({ currentCategory, onCategoryChange }) => {
  const categories: { value: CategoryType; label: string }[] = [
    { value: "now_playing", label: "Now Playing" },
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
    { value: "upcoming", label: "Upcoming" },
  ];

  return (
    <div className="hidden md:flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-full transition-colors ${currentCategory === category.value ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
