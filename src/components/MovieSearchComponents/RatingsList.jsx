function RatedList() {
  // Hämta från localStorage direkt
  const ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
  const sorted = [...ratedMovies].sort((a, b) => b.rating - a.rating);

  return (
    <div className="watchlist-section">
      <h2 className="section-title" id="watch-title">
        R A T I N G S
      </h2>
      {sorted.length < 1 ? (
        <p className="empty-watchlist">Nothing here yet...</p>
      ) : (
        <ul className="rated-list">
          {sorted.map((movie) => (
            <li key={movie.imdbID} className="rated-item">
              {movie.Poster !== "N/A" && (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="rated-poster"
                />
              )}
              <span className="rated-title">
                {movie.Title} ({movie.Year})
              </span>
              <span className="rated-score">⭐ {movie.rating.toFixed(1)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RatedList;
