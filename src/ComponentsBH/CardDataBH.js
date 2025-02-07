import React from "react";
import "./CardDataBH.css";

function CardDataBH({
  title,
  totalSenders,
  topReactions,
  displaySenders,
  extraCount,
}) {
  return (
    <div className="card-data">
      {/* 카드 제목 */}
      <h3 className="card-title">{title}</h3>

      {/* 프로필 이미지 섹션 */}
      <div className="profile-images">
        {displaySenders.map((sender, index) => (
          <img
            key={index}
            src={sender.profileImageURL}
            alt={sender.sender}
            className="profile-image"
          />
        ))}
        {extraCount > 0 && <div className="extra-count">+{extraCount}</div>}
      </div>

      {/* 카드 텍스트 */}
      <p className="card-text">
        <span className="bold-text">{totalSenders}</span>
        <span className="light-text">명이 작성했어요!</span>
      </p>

      {/* 리액션 섹션 */}
      <div className="card-reactions">
        {topReactions.map((reaction, index) => (
          <div key={index} className="reaction-item">
            <span className="reaction-emoji">{reaction.emoji}</span>
            <span className="reaction-count">{reaction.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardDataBH;
