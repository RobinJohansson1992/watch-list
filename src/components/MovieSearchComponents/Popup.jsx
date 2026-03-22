function Popup({ movie, onClose, message }) {
  if (!movie) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {movie.poster !== "N/A" && (
          <img src={movie.Poster} alt={movie.Title} className="popup-poster" />
        )}
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
        <p>{message}</p>
        <button onClick={onClose}>CLOSE</button>
      </div>
    </div>
  );
}

export default Popup;
