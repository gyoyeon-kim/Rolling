import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import "./Header.css";

const Header = ({ showMakeButton = false }) => {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="롤링페이퍼 로고" />
        </Link>
        
        {showMakeButton && (
          <Link to="/post" className="btn_making">
            롤링페이퍼 만들기
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
