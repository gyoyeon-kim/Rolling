import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBarBH from "./SearchBarBH";
import "./HeaderBH.css";
import Logo from "../images/LogoBH.svg";

function HeaderBH({ isMobileOrTablet, onSearch }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={Logo} alt="Rolling Logo" className="logo-image" />
          <h1 className="logo-text">Rolling</h1>
        </div>

        {/* PC에서만 헤더 검색창 표시 */}
        {!isMobileOrTablet && (
          <div className="header-search">
            <SearchBarBH onSearch={onSearch} />
          </div>
        )}

        <button
          className="create-paper-button"
          onClick={() => navigate("/post")}
        >
          롤링 페이퍼 만들기
        </button>
      </div>
    </header>
  );
}

export default HeaderBH;
