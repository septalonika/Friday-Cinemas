export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
}

export type CategoryType = "now_playing" | "popular" | "top_rated" | "upcoming";

export interface CategoryTabsProps {
  currentCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export interface MovieListProps {
  category: CategoryType;
}

export interface ResultProps {
  Keywords: string;
}

export interface ErrorProps {
  Error: string;
}

export interface MovieCardProps {
  MovieDetails: Movie;
}

export interface MovieCardLogoProps {
  MovieDetails: Movie;
  getImageUrl: (url: string | null) => string;
}

export interface MovieCardRatingsProps {
  MovieRatings: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface HamburgerToggleProps {
  onClick: () => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface SidebarProps {
  isOpen: boolean;
  categories: { value: CategoryType; label: string }[];
  currentCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  onClose: () => void;
}

export interface MovieStore {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  currentCategory: CategoryType;
  currentMovie: MovieDetails | null;
  isLoading: boolean;
  error: string | null;
  isHovered: boolean;
  movieDetails: Movie | undefined;

  fetchMoviesByCategory: (category: CategoryType, page?: number) => Promise<void>;
  fetchMovieById: (movieId: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setCurrentCategory: (category: CategoryType) => void;
  fetchMovieByKeywords: (query: string, page?: number) => Promise<void>;
  setHover: (hoverState: boolean, movieDetails?: Movie) => void;
}

export interface MovieDetailBannerProps {
  BackdropUrl: string;
  PosterUrl: string;
  CurrentMovie: MovieDetails;
}

export interface MovieDetailInformationProps {
  CurrentMovie: MovieDetails;
  formatCurrency: (value: number) => string;
  getImageUrl: (url: string | null) => string;
}
