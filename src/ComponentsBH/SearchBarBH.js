import React, { useState } from "react";
import "./SearchBarBH.css";

function SearchBarBH({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  // 엔터 키 입력 감지
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="🔍 롤링페이퍼를 검색해 보세요."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가!
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        검색하기
      </button>
    </div>
  );
}

export default SearchBarBH;
