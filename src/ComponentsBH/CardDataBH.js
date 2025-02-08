import React from "react";
import PropTypes from "prop-types";
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
        {displaySenders && displaySenders.length > 0 &&
          displaySenders.map((sender, index) => (
            <img
              key={sender.sender}
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

      {/* 구분선 */}
      <div className="divider"></div>

      {/* 리액션 섹션 */}
      <div className="card-reactions">
        {topReactions && topReactions.length > 0 &&
          topReactions.map((reaction, index) => (
            <div key={index} className="reaction-item">
              <span className="reaction-emoji">{reaction.emoji}</span>
              <span className="reaction-count">{reaction.count}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

CardDataBH.propTypes = {
  title: PropTypes.string,
  totalSenders: PropTypes.number.isRequired,
  topReactions: PropTypes.arrayOf(
    PropTypes.shape({
      emoji: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  displaySenders: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      profileImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  extraCount: PropTypes.number,
};

CardDataBH.defaultProps = {
  title: "기본 제목",
  extraCount: 0,
};

export default CardDataBH;
