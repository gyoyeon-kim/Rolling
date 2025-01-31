import React, { useState, useEffect } from "react";
import HeaderBH from "../ComponentsBH/HeaderBH";
import CardListBH from "../ComponentsBH/CardListBH";
import FooterBtnBH from "../ComponentsBH/FooterBtnBH";
import "./ListPageBH.css";

function ListPageBH() {
  const [popularItems, setPopularItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 테스트 데이터
  const defaultPopularItems = [
    { id: 1, title: "테스트 인기 카드 1", image: "/image1.jpg", stats: "10명이 좋아했어요!" },
    { id: 2, title: "테스트 인기 카드 2", image: "/image2.jpg", stats: "5명이 좋아했어요!" },
    { id: 3, title: "테스트 인기 카드 3", image: "/image3.jpg", stats: "3명이 작성했어요!" },
    { id: 4, title: "테스트 인기 카드 4", image: "/image4.jpg", stats: "1명이 작성했어요!" },
  ];

  const defaultRecentItems = [
    { id: 5, title: "테스트 최근 카드 1", image: "/image1.jpg", stats: "10명이 좋아했어요!" },
    { id: 6, title: "테스트 최근 카드 2", image: "/image2.jpg", stats: "5명이 좋아했어요!" },
    { id: 7, title: "테스트 최근 카드 3", image: "/image3.jpg", stats: "3명이 작성했어요!" },
    { id: 8, title: "테스트 최근 카드 4", image: "/image4.jpg", stats: "1명이 작성했어요!" },
  ];

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

  return (
    <div className="list-page">
      <HeaderBH />
      <main className="list-content">
        <section className="list-section">
          <h2 className="section-title">인기 롤링 페이퍼 🔥</h2>
          <CardListBH items={popularItems} />
        </section>
        <section className="list-section">
          <h2 className="section-title">최근에 만든 롤링 페이퍼 ⭐</h2>
          <CardListBH items={recentItems} />
        </section>
        <FooterBtnBH />
      </main>
    </div>
  );
}

export default ListPageBH;
