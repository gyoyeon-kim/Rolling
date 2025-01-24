import React from "react";
import Card_BH from "./Card_BH"; // Card_BH의 경로 확인 및 수정
import "./CardList_BH.css";

function CardList_BH({ items }) {
  return (
    <div className="card-list">
      {items.map((item, index) => (
        <Card_BH key={index} {...item} /> // 구문 오류 확인
      ))}
    </div>
  );
}

export default CardList_BH;
