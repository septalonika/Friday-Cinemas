import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CategoryType } from "../../types/movies";
import Logo from "../atoms/Header/Logo";
import SearchBar from "../atoms/Header/SearchBar";
import HamburgerToggle from "../atoms/Header/HamburgerToggle";
import Sidebar from "../atoms/Header/SideBar";

const categories: { value: CategoryType; label: string }[] = [
  { value: "now_playing", label: "Now Playing" },
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Upcoming" },
];

const Header: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryType>("popular");
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCategoryChange = (newCategory: CategoryType) => {
    setCurrentCategory(newCategory);
    navigate(`/?category=${newCategory}&page=1`);
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-4">
          <HamburgerToggle onClick={toggleSidebar} />
          <Logo />
          <div className="relative flex-grow max-w-md mx-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} categories={categories} currentCategory={currentCategory} onCategoryChange={handleCategoryChange} onClose={toggleSidebar} />
    </header>
  );
};

export default Header;
