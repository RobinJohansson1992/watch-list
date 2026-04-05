import MovieCard from "./MovieCard";

function SearchResults({ searchResults, addToWatchList, onRate }) {
  return (
    <div className="movie-grid">
      {searchResults.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          btnFunction={() => addToWatchList(movie)}
          btnClass="add-button"
          btnText="ADD MOVIE"
          onRate={onRate}  // ← ny prop
        />
      ))}
    </div>
  );
}

export default SearchResults;
