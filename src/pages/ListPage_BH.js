import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate를 사용하기 위한 import
import Header_BH from "../Components_BH/Header_BH";
import CardList_BH from "../Components_BH/CardList_BH";
import "./ListPage_BH.css";

function ListPage_BH() {
  const navigate = useNavigate(); // navigate 선언
  const [popularStartIndex, setPopularStartIndex] = useState(0);
  const [recentStartIndex, setRecentStartIndex] = useState(0);

  const popularItems = [
    { id: 1, title: "To. 테스트1", image: "/image1.jpg", stats: "1명이 작성했어요!" },
    { id: 2, title: "To. 테스트2", image: "/image2.jpg", stats: "0명이 작성했어요!" },
    { id: 3, title: "To. 테스트3", image: "/image3.jpg", stats: "3명이 작성했어요!" },
    { id: 4, title: "To. 테스트4", image: "/image4.jpg", stats: "0명이 작성했어요!" },
    { id: 5, title: "To. 테스트5", image: "/image4.jpg", stats: "0명이 작성했어요!" },
    { id: 6, title: "To. 테스트6", image: "/image4.jpg", stats: "0명이 작성했어요!" },
    { id: 7, title: "To. 테스트7", image: "/image4.jpg", stats: "0명이 작성했어요!" },
  ];

  const recentItems = [
    { id: 8, title: "To. ㅠㅠㅠㅠ", image: "/image5.jpg", stats: "1명이 작성했어요!" },
    { id: 9, title: "To. test", image: "/image6.jpg", stats: "2명이 작성했어요!" },
    { id: 10, title: "To. 보희", image: "/image7.jpg", stats: "0명이 작성했어요!" },
    { id: 11, title: "To. 123", image: "/image8.jpg", stats: "0명이 작성했어요!" },
    { id: 12, title: "To. 추가된 카드1", image: "/image9.jpg", stats: "0명이 작성했어요!" },
    { id: 13, title: "To. 추가된 카드2", image: "/image10.jpg", stats: "0명이 작성했어요!" },
  ];

  const maxVisibleCards = 4;

  // 좌우 스크롤 처리 함수
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
      <Header_BH />

      <main className="list-content">
        {/* 인기 섹션 */}
        <section className="list-section">
          <h2 className="section-title">인기 롤링 페이퍼 🔥</h2>
          <div className="carousel-container">
            {popularStartIndex > 0 && (
              <button
                className="scroll-button left"
                onClick={() => scrollLeft("popular")}
              >
                ◀
              </button>
            )}
            <CardList_BH
              items={popularItems.slice(
                popularStartIndex,
                popularStartIndex + maxVisibleCards
              )}
            />
            {popularStartIndex + maxVisibleCards < popularItems.length && (
              <button
                className="scroll-button right"
                onClick={() => scrollRight("popular", popularItems.length)}
              >
                ▶
              </button>
            )}
          </div>
        </section>

        {/* 최근 섹션 */}
        <section className="list-section">
          <h2 className="section-title">최근에 만든 롤링 페이퍼 ⭐</h2>
          <div className="carousel-container">
            {recentStartIndex > 0 && (
              <button
                className="scroll-button left"
                onClick={() => scrollLeft("recent")}
              >
                ◀
              </button>
            )}
            <CardList_BH
              items={recentItems.slice(
                recentStartIndex,
                recentStartIndex + maxVisibleCards
              )}
            />
            {recentStartIndex + maxVisibleCards < recentItems.length && (
              <button
                className="scroll-button right"
                onClick={() => scrollRight("recent", recentItems.length)}
              >
                ▶
              </button>
            )}
          </div>
        </section>

        {/* 나도 만들어보기 버튼 */}
        <div className="create-button-container">
          <button
            className="create-button"
            onClick={() => navigate("/post")}
          >
            나도 만들어보기
          </button>
        </div>
      </main>
    </div>
  );
}

export default ListPage_BH;
