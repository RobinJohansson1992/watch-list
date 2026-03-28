function MovieCard({ movie, btnFunction, btnClass, btnText }) {
  return (
    <div className="movie-card">
      {movie.Poster === "N/A" ? (
        <div className="no-poster">No image</div>
      ) : (
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      )}
      <h4 className="movie-title">
        {movie.Title}({movie.Year})
      </h4>
      <div className="card-buttons">
      <button onClick={btnFunction} className="rateButton">
        RATE
      </button>
      <button onClick={btnFunction} className={btnClass}>
        {btnText}
      </button>
      </div>
      
      {/* <div className="rateBtns">
        <button className="rateBtn"></button>
        <button className="rateBtn"></button>
        <button className="rateBtn"></button>
        <button className="rateBtn"></button>
        <button className="rateBtn"></button>
        <button className="rateBtn"></button>
        <button className="rateBtn"></button>
        <button className="rateBtn"></button>
        <button className="rateBtn"></button>
        <button className="rateBtn"></button>
      </div> */}
    </div>
  );
}

export default MovieCard;
