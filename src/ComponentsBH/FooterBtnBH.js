// ComponentsBH/FooterBtnBH.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FooterBtnBH.css";

function FooterBtnBH() {
  const navigate = useNavigate();

  return (
    <div className="footer-btn-container">
      <button className="footer-btn" onClick={() => navigate("/post")}>
        나도 만들어보기
      </button>
    </div>
  );
}

export default FooterBtnBH;
