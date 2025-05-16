const MovieDetailSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="w-full h-64 md:h-96 bg-gray-300 animate-pulse mb-6 rounded-lg"></div>
      <div className="h-8 bg-gray-300 animate-pulse mb-4 w-3/4 rounded"></div>
      <div className="h-4 bg-gray-300 animate-pulse mb-2 w-1/2 rounded"></div>
      <div className="h-4 bg-gray-300 animate-pulse mb-2 rounded"></div>
      <div className="h-4 bg-gray-300 animate-pulse mb-2 rounded"></div>
      <div className="h-4 bg-gray-300 animate-pulse mb-2 w-3/4 rounded"></div>
    </div>
  );
};

export default MovieDetailSkeleton;
