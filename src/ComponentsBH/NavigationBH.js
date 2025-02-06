@ -1,16 +0,0 @@
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationBH.css";

function NavigationBH() {
  const navigate = useNavigate();

  return (
    <nav className="navigation">
      <button onClick={() => navigate("/")}>로고</button>
      <button onClick={() => navigate("/post")}>롤링 페이퍼 만들기</button>
    </nav>
  );
}

export default NavigationBH;