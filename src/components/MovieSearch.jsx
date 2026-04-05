import { useState, useEffect } from "react";
import Search from "./MovieSearchComponents/Search";
import SearchResults from "./MovieSearchComponents/SearchResults";
import WatchList from "./MovieSearchComponents/WatchList";
import Popup from "./MovieSearchComponents/Popup";
import RatingPopup from "./MovieSearchComponents/RatingPopup";
import RatingsList from "./MovieSearchComponents/RatingsList";

function MovieSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || [],
  );
  const [ratedMovies, setRatedMovies] = useState(
    JSON.parse(localStorage.getItem("ratedMovies")) || [],
  );
  const [currentView, setCurrentView] = useState("main"); // "main" | "rated"
  const [moviePopup, setMoviePopup] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [ratingPopupMovie, setRatingPopupMovie] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
  }, [ratedMovies]);

  function clearResults() {
    setSearchResults([]);
  }

  function AddToWatchList(movieToAdd) {
    if (!watchList.some((movie) => movie.imdbID === movieToAdd.imdbID)) {
      setWatchList([...watchList, movieToAdd]);
    }
    setPopupMessage("✅ Added to watchlist!");
    setMoviePopup(movieToAdd);
  }

  function RemoveFromWatchList(idToRemove) {
    const movieToRemove = watchList.find(
      (movie) => movie.imdbID === idToRemove,
    );
    setWatchList(watchList.filter((movie) => movie.imdbID !== idToRemove));
    setPopupMessage("🗑️ Removed from watchlist.");
    setMoviePopup(movieToRemove);
  }

  function handleRateSubmit(movie, rating) {
    setRatedMovies((prev) => {
      const exists = prev.find((m) => m.imdbID === movie.imdbID);
      if (exists) {
        // Uppdatera betyget om filmen redan är betygsatt
        return prev.map((m) =>
          m.imdbID === movie.imdbID ? { ...m, rating } : m,
        );
      }
      return [...prev, { ...movie, rating }];
    });
  }

  async function HandleSearch(event, searchTerm) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`,
      );
      const data = await response.json();
      if (data.Response === "True") {
        setSearchResults(data.Search);
      }
    } catch (error) {}
  }

  return (
    <>
      <div className="header-box">
        <h1 className="app-title">M O V I E - L I S T</h1>
        <Search
          handleSearch={HandleSearch}
          clearResults={clearResults}
          onShowWatchlist={() => setCurrentView("main")}
          onShowRated={() => setCurrentView((v) => "rated")}
        />
      </div>

      <Popup
        movie={moviePopup}
        onClose={() => setMoviePopup(null)}
        message={popupMessage}
      />
      <RatingPopup
        movie={ratingPopupMovie}
        onClose={() => setRatingPopupMovie(null)}
        onSubmit={handleRateSubmit}
      />

      {currentView === "rated" ? (
        <RatingsList ratedMovies={ratedMovies} />
      ) : (
        <>
          <SearchResults
            searchResults={searchResults}
            addToWatchList={AddToWatchList}
            onRate={setRatingPopupMovie}
          />
          <WatchList
            movies={watchList}
            removeFromWatchList={RemoveFromWatchList}
            onRate={setRatingPopupMovie}
          />
        </>
      )}
    </>
  );
}

export default MovieSearch;
