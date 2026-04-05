import { useState } from "react";

function Search({ handleSearch, clearResults, onShowRated, onShowWatchlist }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchClear() {
    setSearchTerm("");
    //hämta från movieSearch:
    clearResults();
    onShowWatchlist();
  }

  return (
    <div className="search-section">
      <h2 className="section-title">SEARCH MOVIES:</h2>
      <form
        className="search-form"
        onSubmit={(event) => handleSearch(event, searchTerm)}
      >
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="search-buttons">
          <button type="submit" className="search-button">
            🔍
          </button>
          <button className="search-button" onClick={handleSearchClear}>
            🎬
          </button>
          <button className="search-button" onClick={onShowRated}>⭐</button>
        </div>
      </form>
    </div>
  );
}

export default Search;
