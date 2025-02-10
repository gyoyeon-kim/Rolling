import React, { useState } from "react";
import "./SearchBarBH.css";

function SearchBarBH({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="🔍롤링페이퍼를 검색해 보세요."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        검색하기
      </button>
    </div>
  );
}

export default SearchBarBH;
