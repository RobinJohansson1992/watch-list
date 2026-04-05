import { useState } from "react";

function RatingPopup({ movie, onClose, onSubmit }) {
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");

  if (!movie) {
    return null;
  }

  function handleSubmit() {
    const parsed = parseFloat(rating);
    if (isNaN(parsed) || parsed < 0 || parsed > 10) {
      setError("Rating must be between 0 and 10.");
      return;
    }
    onSubmit(movie, parsed);
    onClose();
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {movie.Poster !== "N/A" && (
          <img src={movie.Poster} alt={movie.Title} className="popup-poster" />
        )}
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
        <p>Add rating: (0–10):</p>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            setError("");
          }}
          placeholder="ex. 8.2"
          className="rating-input"
        />
        {error && <p className="rating-error">{error}</p>}
        <div className="card-buttons">
          <button onClick={handleSubmit} className="add-button">
            SAVE
          </button>
          <button onClick={onClose} className="remove-button">
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
export default RatingPopup;
