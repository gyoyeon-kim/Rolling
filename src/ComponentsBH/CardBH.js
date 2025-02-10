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
    const controller = new AbortController();
    const { signal } = controller;

    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for ID: ${id}`);
        const response = await fetch(
          `https://rolling-api.vercel.app/13-1/recipients/${id}/messages/`,
          { signal }
        );
        if (!response.ok)
          throw new Error(
            `Failed to fetch messages (Status: ${response.status})`
          );

        const data = await response.json();
        if (!data.results) throw new Error("Invalid data format");

        const uniqueSenders = [
          ...new Map(data.results.map((msg) => [msg.sender, msg])).values(),
        ];

        setDisplaySenders((prev) =>
          JSON.stringify(prev) !== JSON.stringify(uniqueSenders.slice(0, 3))
            ? uniqueSenders.slice(0, 3)
            : prev
        );
        setExtraCount((prev) =>
          prev !== Math.max(uniqueSenders.length - 3, 0)
            ? Math.max(uniqueSenders.length - 3, 0)
            : prev
        );
        setTotalSenders((prev) =>
          prev !== uniqueSenders.length ? uniqueSenders.length : prev
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
    return () => controller.abort();
  }, [id]);

  const patterns = {
    beige: { pattern: pattern02, bgColor: "#FFE2AD" },
    purple: { pattern: pattern01, bgColor: "#ECD9FF" },
    blue: { pattern: pattern03, bgColor: "#B1E4FF" },
    green: { pattern: pattern04, bgColor: "#D0F5C3" },
  };

  const { pattern: patternImage, bgColor } = patterns[backgroundColor] || {
    pattern: null,
    bgColor: backgroundColor || "#FFFFFF",
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
      {!backgroundImageURL && patternImage && (
        <img src={patternImage} alt="pattern" className="card-pattern" />
      )}
      <CardDataBH
        title={title}
        totalSenders={totalSenders}
        topReactions={topReactions}
        displaySenders={displaySenders}
        extraCount={extraCount}
      />
    </div>
  );
}

export default CardBH;
