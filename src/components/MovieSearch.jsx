// useState är en hook, även useEffect-(varje gång watchlist ändras ska den här koden köras(i detta fallet)).

import { useState, useEffect } from "react";
import Search from "./MovieSearchComponents/Search";
import SearchResults from "./MovieSearchComponents/SearchResults";
import WatchList from "./MovieSearchComponents/WatchList";

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

  function AddToWatchList(movieToAdd) {
    if (!watchList.some((movie) => movie.imdbID === movieToAdd.imdbID)) {
      SetWatchList([...watchList, movieToAdd]);
    }
  }

  function RemoveFromWatchList(idToRemove) {
    SetWatchList(watchList.filter((movie) => movie.imdbID !== idToRemove));
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
      <h1 className="app-title">MOVIE WATCH LIST</h1>
      {/*search form*/}
      <Search handleSearch={HandleSearch} clearResults={clearResults} />
      <SearchResults
        searchResults={searchResults}
        addToWatchList={AddToWatchList}
      />
      <WatchList movies={watchList} removeFromWatchList={RemoveFromWatchList} />
    </>
  );
}

export default MovieSearch;
