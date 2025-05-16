import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/molecules/Header";
import Footer from "./components/molecules/Footer";
import HomePage from "./pages/Home";
import MovieDetailsPage from "./pages/MovieDetail";
import SearchPage from "./pages/Search";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow pt-6 pb-12 container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
