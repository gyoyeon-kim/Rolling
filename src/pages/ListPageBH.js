import React, { useState, useEffect } from "react";
import HeaderBH from "../ComponentsBH/HeaderBH";
import CardListBH from "../ComponentsBH/CardListBH";
import FooterBtnBH from "../ComponentsBH/FooterBtnBH";
import "./ListPageBH.css";
import arrowLeft from "../images/arrow_left.svg";
import arrowRight from "../images/arrow_right.svg";

function ListPageBH() {
  const [popularItems, setPopularItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [popularStartIndex, setPopularStartIndex] = useState(0);
  const [recentStartIndex, setRecentStartIndex] = useState(0);

  const maxVisibleCards = 4;

  // 반응형 디바이스 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*
  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const popularResponse = await fetch(
          "https://rolling-api.vercel.app/13-1/recipients/?sort=like&limit=10"
        );
        const popularData = await popularResponse.json();

        const recentResponse = await fetch(
          "https://rolling-api.vercel.app/13-1/recipients/?limit=10"
        );
        const recentData = await recentResponse.json();

        setPopularItems(popularData.results || []);
        setRecentItems(recentData.results || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  */

  if (loading)
    return <p>⏳ 데이터 불러오는 중입니다. 잠시만 기다려 주세요...</p>;
  if (error) return <p>❌ {error}</p>;

  // 🔹 한 장씩 좌우 이동
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
      <HeaderBH />
      <main className="list-content">
        {/* 인기 섹션 */}
        <section className="list-section">
          <h2 className="section-title">인기 롤링 페이퍼 🔥</h2>
          <div
            className={`carousel-container ${isMobileOrTablet ? "touch-scroll" : ""}`}
          >
            {/* 좌측 버튼 (첫 번째 카드일 때 숨김) */}
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
            {/* 우측 버튼 (마지막 카드일 때 숨김) */}
            {!isMobileOrTablet &&
              popularStartIndex + maxVisibleCards < popularItems.length &&
              popularItems.length > maxVisibleCards && (
                <button
                  className="scroll-button right"
                  onClick={() => scrollRight("popular", popularItems.length)}
                  aria-label="Scroll Right"
                >
                  <img src={arrowRight} alt="Scroll Right" />
                </button>
              )}
          </div>
        </section>

        {/* 최근 섹션 */}
        <section className="list-section">
          <h2 className="section-title">최근에 만든 롤링 페이퍼 ⭐</h2>
          <div
            className={`carousel-container ${isMobileOrTablet ? "touch-scroll" : ""}`}
          >
            {/* 좌측 버튼 (첫 번째 카드일 때 숨김) */}
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
            {/* 우측 버튼 (마지막 카드일 때 숨김) */}
            {!isMobileOrTablet &&
              recentStartIndex + maxVisibleCards < recentItems.length &&
              recentItems.length > maxVisibleCards && (
                <button
                  className="scroll-button right"
                  onClick={() => scrollRight("recent", recentItems.length)}
                  aria-label="Scroll Right"
                >
                  <img src={arrowRight} alt="Scroll Right" />
                </button>
              )}
          </div>
        </section>
        <FooterBtnBH />
      </main>
    </div>
  );
}

export default ListPageBH;
