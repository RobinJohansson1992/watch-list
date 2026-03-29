// useState är en hook, även useEffect-(varje gång watchlist ändras ska den här koden köras(i detta fallet)).

import { useState, useEffect } from "react";
import Search from "./MovieSearchComponents/Search";
import SearchResults from "./MovieSearchComponents/SearchResults";
import WatchList from "./MovieSearchComponents/WatchList";
import Popup from "./MovieSearchComponents/Popup";

function MovieSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [watchList, SetWatchList] = useState(
    // sätt "eller tom || []" för att sidan ska fungera även när man tömmer listan:
    JSON.parse(localStorage.getItem("watchlist")) || [],
  );

  //hämta api-nyckeln från .env:
  const apiKey = import.meta.env.VITE_API_KEY;

  //tar emot två parametrar, först en funktion, sen en lista med dependencies:
  //useEffect funkar som en trigger.
  useEffect(() => {
    //localStorage - inbyggt i javascript.
    localStorage.setItem("watchlist", JSON.stringify(watchList));
  }, [watchList]);

  function clearResults() {
    //gör searchResults till tom array:
    setSearchResults([]);
  }
  // popup:
  const [moviePopup, setMoviePopup] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  function AddToWatchList(movieToAdd) {
    if (!watchList.some((movie) => movie.imdbID === movieToAdd.imdbID)) {
      SetWatchList([...watchList, movieToAdd]);
    }
    setPopupMessage("✅ Added to watchlist!");
    setMoviePopup(movieToAdd);
  }

  function RemoveFromWatchList(idToRemove) {
    const movieToRemove = watchList.find(
      (movie) => movie.imdbID === idToRemove,
    );
    SetWatchList(watchList.filter((movie) => movie.imdbID !== idToRemove));
    setPopupMessage("🗑️ Removed from watchlist.");
    setMoviePopup(movieToRemove);
  }

  async function HandleSearch(event, searchTerm) {
    event.preventDefault();
    try {
      //använda nyckeln i response:
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`,
      );
      const data = await response.json();
      console.log(data);
      if (data.Response === "True") {
        setSearchResults(data.Search);
      }
    } catch (error) {}
  }

  return (
    <>
      <div className="header-box">
        <h1 className="app-title">M O V I E - L I S T</h1>
        <Search handleSearch={HandleSearch} clearResults={clearResults} />
      </div>
      <Popup
        movie={moviePopup}
        onClose={() => setMoviePopup(null)}
        message={popupMessage}
      />
      {/*search form*/}
      <SearchResults
        searchResults={searchResults}
        addToWatchList={AddToWatchList}
      />
      <WatchList movies={watchList} removeFromWatchList={RemoveFromWatchList} />
    </>
  );
}

export default MovieSearch;
