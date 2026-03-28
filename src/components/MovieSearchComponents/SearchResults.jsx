import MovieCard from "./MovieCard";

function SearchResults({ searchResults, addToWatchList }) {
  return (
    <div className="search-results">
      <div className="movie-grid">
        {searchResults.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            btnFunction={() => addToWatchList(movie)}
            btnClass="add-button"
            btnText="ADD MOVIE"
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
