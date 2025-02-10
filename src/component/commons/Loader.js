// components/Loader.js
import React from "react";
import "./Loader.css"; // 스타일 파일 따로 관리

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
