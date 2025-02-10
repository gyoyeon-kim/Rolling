import React from "react";
import CardBH from "./CardBH"; // CardBH 컴포넌트 임포트
import "./CardListBH.css";

function CardListBH({ items }) {
  // items
  return (
    <div className="card-list">
      {items.map((item) => (
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
  );
}

export default CardListBH;
