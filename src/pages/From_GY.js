import React from "react";
import "./From_GY.css";

import rolling_icon from "../images/logo.svg";

const From_GY = () => {
  return (
    <div className="Main">
      <div className="header">
        <a href="/">
          <img className="logo" src={rolling_icon} alt="롤링 이미지" />
        </a>
      </div>
      <div className="From_main">
        <p>기본 글꼴 Pretendard</p>
      </div>

      <div>
        <p> 여기 밑에꺼</p>
      </div>
    </div>
  );
};

export default From_GY;
