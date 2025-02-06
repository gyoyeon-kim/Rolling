import React, { useState, useEffect } from "react";
import HeaderBH from "../ComponentsBH/HeaderBH";
import CardListBH from "../ComponentsBH/CardListBH";
import FooterBtnBH from "../ComponentsBH/FooterBtnBH";
import "./ListPageBH.css";

// Import images from `src/images/`
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

  // 테스트 데이터
  const defaultPopularItems = [
    { id: 10, title: "테스트 인기 카드 1", image: "/image1.jpg", stats: "10명이 좋아했어요!" },
    { id: 2, title: "테스트 인기 카드 2", image: "/image2.jpg", stats: "5명이 좋아했어요!" },
    { id: 3, title: "테스트 인기 카드 3", image: "/image3.jpg", stats: "3명이 작성했어요!" },
    { id: 4, title: "테스트 인기 카드 4", image: "/image4.jpg", stats: "1명이 작성했어요!" },
    { id: 5, title: "테스트 인기 카드 5", image: "/image3.jpg", stats: "3명이 작성했어요!" },
    { id: 6, title: "테스트 인기 카드 6", image: "/image4.jpg", stats: "1명이 작성했어요!" },
  ];

  const defaultRecentItems = [
    { id: 8, title: "테스트 최근 카드 1", image: "/image1.jpg", stats: "10명이 좋아했어요!" },
    { id: 9, title: "테스트 최근 카드 2", image: "/image2.jpg", stats: "5명이 좋아했어요!" },
    { id: 10, title: "테스트 최근 카드 3", image: "/image3.jpg", stats: "3명이 작성했어요!" },
  ];

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
        const popularResponse = await fetch("https://rolling-api.vercel.app/13-1/recipients/?sort=like");
        const popularData = await popularResponse.json();

        const recentResponse = await fetch("https://rolling-api.vercel.app/13-1/recipients/");
        const recentData = await recentResponse.json();

        setPopularItems(popularData?.data?.length ? popularData.data : defaultPopularItems);
        setRecentItems(recentData?.data?.length ? recentData.data : defaultRecentItems);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setPopularItems(defaultPopularItems);
        setRecentItems(defaultRecentItems);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>⏳ 데이터 불러오는 중입니다. 잠시만 기다려 주세요...</p>;
  if (error) return <p>❌ {error}</p>;

  // 스크롤 핸들러
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
          <div className={`carousel-container ${isMobileOrTablet ? "touch-scroll" : ""}`}>
            {/* 좌측 버튼 */}
            {!isMobileOrTablet && popularStartIndex > 0 && (
              <button
                className="scroll-button left"
                onClick={() => scrollLeft("popular")}
                aria-label="Scroll Left"
              >
                <img src={arrowLeft} alt="Scroll Left" />
              </button>
            )}
            <CardListBH
              items={isMobileOrTablet
                ? popularItems
                : popularItems.slice(popularStartIndex, popularStartIndex + maxVisibleCards)}
            />
            {/* 우측 버튼 */}
            {!isMobileOrTablet &&
              popularStartIndex + maxVisibleCards < popularItems.length && (
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
          <div className={`carousel-container ${isMobileOrTablet ? "touch-scroll" : ""}`}>
            {/* 좌측 버튼 */}
            {!isMobileOrTablet && recentStartIndex > 0 && (
              <button
                className="scroll-button left"
                onClick={() => scrollLeft("recent")}
                aria-label="Scroll Left"
              >
                <img src={arrowLeft} alt="Scroll Left" />
              </button>
            )}
            <CardListBH
              items={isMobileOrTablet
                ? recentItems
                : recentItems.slice(recentStartIndex, recentStartIndex + maxVisibleCards)}
            />
            {/* 우측 버튼 */}
            {!isMobileOrTablet &&
              recentStartIndex + maxVisibleCards < recentItems.length && (
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
