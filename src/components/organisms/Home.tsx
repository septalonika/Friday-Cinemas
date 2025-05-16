import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryTabs from "../molecules/CategoryTabs";
import MovieList from "../molecules/Movie/List";
import { useMovieStore } from "../../stores/movieStore";
import { type CategoryType } from "../../types/movies";

const Home: React.FC = () => {
  const { currentCategory, setCurrentCategory } = useMovieStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlCategory = searchParams.get("category") as CategoryType | null;
    if (urlCategory && urlCategory !== currentCategory) {
      setCurrentCategory(urlCategory);
    } else if (!urlCategory) {
      setSearchParams({ category: currentCategory });
    }
  }, [searchParams, currentCategory, setCurrentCategory, setSearchParams]);

  const handleCategoryChange = (newCategory: CategoryType) => {
    setCurrentCategory(newCategory);
    setSearchParams({ category: newCategory, page: "1" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Discover Movies</h1>
      <CategoryTabs currentCategory={currentCategory} onCategoryChange={handleCategoryChange} />
      <MovieList category={currentCategory} />
    </div>
  );
};

export default Home;
