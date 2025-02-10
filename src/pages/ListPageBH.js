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

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://rolling-api.vercel.app/13-1/recipients/?limit=1000");
        const data = await response.json();
  
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error("Invalid data format");
        }
  
        console.log("📌 API 응답 데이터:", data.results); // 데이터 구조 확인
  
        // 🔥 인기 섹션: messageCount(메시지 개수) 순 정렬 (많은 게 인기!)
        const sortedByMessageCount = [...data.results].sort(
          (a, b) => (b.messageCount || 0) - (a.messageCount || 0)
        );
  
        // ⭐ 최근 섹션: createdAt(생성 날짜) 순 정렬 (최신이 위로!)
        const sortedByRecent = [...data.results].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
  
        console.log("🔥 인기 정렬 결과 (messageCount 기준):", sortedByMessageCount.slice(0, 5));
        console.log("⭐ 최근 정렬 결과 (createdAt 기준):", sortedByRecent.slice(0, 5));
  
        setPopularItems(sortedByMessageCount);
        setRecentItems(sortedByRecent);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  

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
