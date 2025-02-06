import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

import logo from "../images/logo.svg";

function Navigation() {
  return (
    <header className="nav-container">
      {/* 로고 버튼 */}
      <div className="nav">
        <Link to="/" className="logo">
          <img src={logo} alt="Rolling Logo" className="logo-img" />
          {/* 텍스트로 된 로고라면 <span>으로도 가능 */}
        </Link>

        {/* 롤링 페이퍼 만들기 버튼 */}
        <Link to="/post/123" className="rolling-button">
          롤링 페이퍼 만들기
        </Link>
      </div>
    </header>
  );
}

export default Navigation;
