import React, { useState, useEffect } from "react";
import HeaderBH from "../ComponentsBH/HeaderBH"; // HeaderBH 컴포넌트
import SearchBarBH from "../ComponentsBH/SearchBarBH";
import CardListBH from "../ComponentsBH/CardListBH";
import FooterBtnBH from "../ComponentsBH/FooterBtnBH";
import CursorEffect from "../component/commons/CursorEffect";
import "./ListPageBH.css";
import arrowLeft from "../images/arrow_left.svg";
import arrowRight from "../images/arrow_right.svg";
import CardBH from "../ComponentsBH/CardBH"; // Card 컴포넌트

function ListPageBH() {
  const [popularItems, setPopularItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [popularStartIndex, setPopularStartIndex] = useState(0);
  const [recentStartIndex, setRecentStartIndex] = useState(0);

  const maxVisibleCards = 4;

  // 반응형 디바이스 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024); // 1024px 이하를 모바일/태블릿으로 간주
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 데이터 가져오기
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch(
          "https://rolling-api.vercel.app/13-1/recipients/?limit=1000"
        );
        const data = await response.json();
        const sortedByMessageCount = [...data.results].sort(
          (a, b) => (b.messageCount || 0) - (a.messageCount || 0)
        );
        const sortedByRecent = [...data.results].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        setPopularItems(sortedByMessageCount);
        setRecentItems(sortedByRecent);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
      }
    };

    fetchAllData();
  }, []);

  // 검색 기능
  const handleSearch = (query) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);  // 검색 결과 초기화
      return;
    }
    const filteredResults = popularItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
    setIsSearching(true);
  };

  // 좌우 스크롤
  const scrollLeft = (section) => {
    if (section === "popular") {
      setPopularStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (section === "recent") {
      setRecentStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const scrollRight = (section, itemsLength) => {
    if (section === "popular") {
      setPopularStartIndex((prevIndex) =>
        Math.min(prevIndex + 1, itemsLength - maxVisibleCards)
      );
    } else if (section === "recent") {
      setRecentStartIndex((prevIndex) =>
        Math.min(prevIndex + 1, itemsLength - maxVisibleCards)
      );
    }
  };

  return (
    <div className="list-page">
      <CursorEffect />

      {/* PC에서는 HeaderBH에 검색창 포함 */}
      <HeaderBH isMobileOrTablet={isMobileOrTablet} onSearch={handleSearch} />

      <main className="list-content">
        {/* 모바일/태블릿: 헤더 외부 검색창 */}
        {isMobileOrTablet && (
          <div className="search-section">
            <SearchBarBH onSearch={handleSearch} />
          </div>
        )}

        {isSearching ? (
          <section className="list-section">
            <h2 className="section-title">검색 결과 🔍</h2>
            {searchResults && searchResults.length > 0 ? (
              <div className="search-results-grid">
                {searchResults.map((item, index) => (
                  <CardBH
                    key={item.id}
                    id={item.id}
                    title={`To. ${item.name}`}
                    backgroundImageURL={item.backgroundImageURL}
                    backgroundColor={item.backgroundColor}
                    stats={`${item.messageCount}명이 작성했어요!`}
                    topReactions={item.topReactions}
                    recentMessages={item.recentMessages}
                    messageCount={item.messageCount}
                  />
                ))}
              </div>
            ) : (
              <p>검색된 롤링 페이퍼가 없습니다.</p>
            )}
          </section>
        ) : (
          <>
            {/* 인기 롤링 페이퍼 섹션 */}
            <section className="list-section">
              <h2 className="section-title">인기 롤링 페이퍼 🔥</h2>
              <div
                className={`carousel-container ${
                  isMobileOrTablet ? "touch-scroll" : ""
                }`}
              >
                {!isMobileOrTablet &&
                  popularStartIndex > 0 &&
                  popularItems.length > maxVisibleCards && (
                    <button
                      className="scroll-button left"
                      onClick={() => scrollLeft("popular")}
                      aria-label="Scroll Left"
                    >
                      <img src={arrowLeft} alt="Scroll Left" />
                    </button>
                  )}
                <CardListBH
                  items={
                    isMobileOrTablet
                      ? popularItems
                      : popularItems.slice(
                          popularStartIndex,
                          popularStartIndex + maxVisibleCards
                        )
                  }
                />
                {!isMobileOrTablet &&
                  popularStartIndex + maxVisibleCards < popularItems.length &&
                  popularItems.length > maxVisibleCards && (
                    <button
                      className="scroll-button right"
                      onClick={() =>
                        scrollRight("popular", popularItems.length)
                      }
                      aria-label="Scroll Right"
                    >
                      <img src={arrowRight} alt="Scroll Right" />
                    </button>
                  )}
              </div>
            </section>

            {/* 최근에 만든 롤링 페이퍼 섹션 */}
            <section className="list-section">
              <h2 className="section-title">최근에 만든 롤링 페이퍼 ⭐</h2>
              <div
                className={`carousel-container ${
                  isMobileOrTablet ? "touch-scroll" : ""
                }`}
              >
                {!isMobileOrTablet &&
                  recentStartIndex > 0 &&
                  recentItems.length > maxVisibleCards && (
                    <button
                      className="scroll-button left"
                      onClick={() => scrollLeft("recent")}
                      aria-label="Scroll Left"
                    >
                      <img src={arrowLeft} alt="Scroll Left" />
                    </button>
                  )}
                <CardListBH
                  items={
                    isMobileOrTablet
                      ? recentItems
                      : recentItems.slice(
                          recentStartIndex,
                          recentStartIndex + maxVisibleCards
                        )
                  }
                />
                {!isMobileOrTablet &&
                  recentStartIndex + maxVisibleCards < recentItems.length &&
                  recentItems.length > maxVisibleCards && (
                    <button
                      className="scroll-button right"
                      onClick={() =>
                        scrollRight("recent", recentItems.length)
                      }
                      aria-label="Scroll Right"
                    >
                      <img src={arrowRight} alt="Scroll Right" />
                    </button>
                  )}
              </div>
            </section>
          </>
        )}
        <FooterBtnBH />
      </main>
    </div>
  );
}

export default ListPageBH;
