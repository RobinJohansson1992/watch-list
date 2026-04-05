import MovieCard from "./MovieCard";

function WatchList({ movies, removeFromWatchList, onRate }) {
  return (
    <div className="watchlist-section">
      <h2 className="section-title" id="watch-title">
        W A T C H L I S T
      </h2>
      {/* 2 html-element(paranteserna): om det första är true så kör det, annars kör det andra. */}
      {movies.length < 1 ? (
        <p className="empty-watchlist">Your watchlist is empty.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              btnFunction={() => removeFromWatchList(movie.imdbID)}
              btnClass="remove-button"
              btnText="REMOVE"
              onRate={onRate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchList;
