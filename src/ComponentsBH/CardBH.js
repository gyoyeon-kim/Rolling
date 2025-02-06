import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardBH.css";
import pattern01 from "../images/card_img/pattern_01.png";
import pattern02 from "../images/card_img/pattern_02.png";
import pattern03 from "../images/card_img/pattern_03.png";
import pattern04 from "../images/card_img/pattern_04.png";

function CardBH({
  id,
  title,
  backgroundImageURL,
  backgroundColor,
  stats,
  topReactions,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`); // 동적 경로로 이동
  };

  // 배경 이미지와 컬러를 선택하는 함수
  const getPatternAndBackgroundColor = (color) => {
    switch (color) {
      case "beige":
        return { pattern: pattern02, bgColor: "#FFE2AD" };
      case "purple":
        return { pattern: pattern01, bgColor: "#ECD9FF" };
      case "blue":
        return { pattern: pattern03, bgColor: "#B1E4FF" };
      case "green":
        return { pattern: pattern04, bgColor: "#D0F5C3" };
      default:
        return { pattern: null, bgColor: backgroundColor };
    }
  };

  // 배경 이미지와 컬러 값을 가져옴
  const { pattern: patternImage, bgColor } = getPatternAndBackgroundColor(
    backgroundColor
  );

  return (
    <div
      className="BHcard"
      onClick={handleClick}
      style={{
        background: backgroundImageURL
          ? `url(${backgroundImageURL}) center/cover no-repeat`
          : bgColor, // 배경 이미지가 없으면 컬러 사용
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
      {patternImage && (
        <img
          src={patternImage}
          alt="pattern"
          className="card-pattern"
          style={{ position: "absolute", bottom: "10px", right: "10px" }}
        />
      )}
    </div>
  );
}

export default CardBH;
