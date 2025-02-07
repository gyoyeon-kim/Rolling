import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CardBH.css";
import CardDataBH from "./CardDataBH";
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

  const patterns = {
    beige: { pattern: pattern02, bgColor: "#FFE2AD" },
    purple: { pattern: pattern01, bgColor: "#ECD9FF" },
    blue: { pattern: pattern03, bgColor: "#B1E4FF" },
    green: { pattern: pattern04, bgColor: "#D0F5C3" },
  };

  const { pattern: patternImage, bgColor } = patterns[backgroundColor] || {
    pattern: null,
    bgColor: backgroundColor,
  };

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
      {patternImage && (
        <img src={patternImage} alt="pattern" className="card-pattern" />
      )}
      <CardDataBH
        title={title} // 타이틀 전달
        totalSenders={totalSenders}
        topReactions={topReactions}
        displaySenders={displaySenders}
        extraCount={extraCount}
      />
    </div>
  );
}

export default CardBH;
