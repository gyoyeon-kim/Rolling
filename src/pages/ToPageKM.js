import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import rolling_icon from "../images/logo.svg";
import default_profile from "../images/From_img/profile.svg";
import "./ToPageKM.css";

const ToPageKM = () => {
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState(false);
  const [background, setBackground] = useState("#ffffff"); // 기본 배경색
  const [image, setImage] = useState(null); // 업로드 이미지 상태
  const navigate = useNavigate();

  return (
    <div className="to-page-container">
      <header className="header">
        <Link to="/">
          <img className="logo" src={rolling_icon} alt="롤링 이미지" />
        </Link>
      </header>
      {/*내용*/}
    </div>
  );
};

export default ToPageKM;