import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CardBH.css"; // 스타일 파일
import pattern01 from "../images/card_img/pattern_01.png";
import pattern02 from "../images/card_img/pattern_02.png";
import pattern03 from "../images/card_img/pattern_03.png";
import pattern04 from "../images/card_img/pattern_04.png";

function CardBH({
  id,
  title,
  backgroundImageURL,
  backgroundColor,
  stats, // 기존에 사용하지 않을 경우 제거 가능
  topReactions,
}) {
  const navigate = useNavigate();
  const [displaySenders, setDisplaySenders] = useState([]);
  const [extraCount, setExtraCount] = useState(0);
  const [totalSenders, setTotalSenders] = useState(0); // 총 작성자 수 상태 추가

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  // API 호출 및 데이터 처리
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://rolling-api.vercel.app/13-1/recipients/${id}/messages/`
        );
        const data = await response.json();

        const uniqueSenders = [
          ...new Map(data.results.map((msg) => [msg.sender, msg])).values(),
        ];
        setDisplaySenders(uniqueSenders.slice(0, 3)); // 최대 3명만 표시
        setExtraCount(uniqueSenders.length - 3); // 3명을 초과한 수
        setTotalSenders(uniqueSenders.length); // 총 작성자 수 저장
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [id]);

  // 배경 이미지와 컬러 선택
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
          : bgColor,
      }}
    >
      <div className="card-content">
        <h3>{title}</h3>
        {/* 정확한 작성자 수 표시 */}
        <p>{totalSenders}명이 작성했어요!</p>
        <div className="reactions">
          {topReactions.map((reaction, index) => (
            <span key={index} className="reaction">
              {reaction.emoji} {reaction.count}
            </span>
          ))}
        </div>
      </div>

      {/* 작성자 이미지 */}
      <div className="profile-images">
        {displaySenders.map((sender, index) => (
          <img
            key={index}
            src={sender.profileImageURL}
            alt={sender.sender}
            className="profile-image"
          />
        ))}
        {extraCount > 0 && (
          <div className="extra-count">+{extraCount}</div>
        )}
      </div>

      {/* 패턴 이미지 */}
      {patternImage && (
        <img
          src={patternImage}
          alt="pattern"
          className="card-pattern"
        />
      )}
    </div>
  );
}

export default CardBH;
