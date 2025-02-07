import React, { useState, useEffect } from "react";
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
  topReactions,
}) {
  const navigate = useNavigate();
  const [displaySenders, setDisplaySenders] = useState([]);
  const [extraCount, setExtraCount] = useState(0);
  const [totalSenders, setTotalSenders] = useState(0);

  // 작성자 정보를 API에서 가져오기
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
        setDisplaySenders(uniqueSenders.slice(0, 3));
        setExtraCount(Math.max(uniqueSenders.length - 3, 0));
        setTotalSenders(uniqueSenders.length);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [id]);

  // 배경 패턴 및 색상 매핑
  const patterns = {
    beige: { pattern: pattern02, bgColor: "#FFE2AD" },
    purple: { pattern: pattern01, bgColor: "#ECD9FF" },
    blue: { pattern: pattern03, bgColor: "#B1E4FF" },
    green: { pattern: pattern04, bgColor: "#D0F5C3" },
  };

  const { pattern: patternImage, bgColor } =
    patterns[backgroundColor] || { pattern: null, bgColor: backgroundColor };

  // 가장 많이 달린 리액션 3개 가져오기
  const topThreeReactions = [...topReactions]
    .sort((a, b) => b.count - a.count) // count 기준 내림차순 정렬
    .slice(0, 3); // 상위 3개 추출

  return (
    <div
      className="BHcard"
      onClick={() => navigate(`/post/${id}`)}
      style={{
        background: backgroundImageURL
          ? `url(${backgroundImageURL}) center/cover no-repeat`
          : bgColor,
      }}
    >
      <div className="card-content">
        <h3>{title}</h3>
        <p>{totalSenders}명이 작성했어요!</p>
        <div className="reactions">
          {topThreeReactions.map((reaction, index) => (
            <span key={index} className="reaction">
              {reaction.emoji} {reaction.count}
            </span>
          ))}
        </div>
      </div>

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

      {patternImage && <img src={patternImage} alt="pattern" className="card-pattern" />}
    </div>
  );
}

export default CardBH;
