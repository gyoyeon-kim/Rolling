import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header_BH.css";
import Logo from "../images/Logo_BH.svg"; // 로고 파일 경로

function Header_BH() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate("/")}>
        <img src={Logo} alt="Rolling Logo" className="logo-image" />
        <h1 className="logo-text">Rolling</h1>
      </div>
      <button className="create-paper-button" onClick={() => navigate("/post")}>
        롤링 페이퍼 만들기
      </button>
    </header>
  );
}

export default Header_BH;
