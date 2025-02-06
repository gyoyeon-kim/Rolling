import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardBH.css";

function CardBH({ id, title, backgroundImageURL, backgroundColor, stats, topReactions }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`); // 동적 경로로 이동
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{
        background: backgroundImageURL
          ? `url(${backgroundImageURL}) center/cover no-repeat`
          : backgroundColor, // 배경 이미지가 없으면 컬러 사용
      }}
    >
      <div className="card-content">
        <h3>{title}</h3>
        <p>{stats}</p>
        <div className="reactions">
          {topReactions.map((reaction, index) => (
            <span key={index} className="reaction">
              {reaction.emoji} {reaction.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardBH;
