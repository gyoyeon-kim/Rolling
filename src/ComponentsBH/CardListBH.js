import React from "react";
import CardBH from "./CardBH"; // Card_BH의 경로 확인 및 수정
import "./CardListBH.css";

function CardListBH({ items }) {
  return (
    <div className="card-list">
      {items.map((item, index) => (
        <CardBH key={index} {...item} /> // 구문 오류 확인
      ))}
    </div>
  );
}

export default CardListBH;
