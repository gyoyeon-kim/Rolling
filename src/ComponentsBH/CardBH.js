import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardBH.css";

function CardBH({ id, title, image, stats }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/123`); // 동적 경로 이동
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{stats}</p>
      </div>
    </div>
  );
}

export default CardBH;
