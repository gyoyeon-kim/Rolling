import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import rolling_icon from "../images/logo.svg";
import checkIcon from "../images/to_img/image_3.svg";
import axios from "axios"; // axios 추가
import "./ToPageKM.css";

const ToPageKM = () => {
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState(false);
  const [backgroundError, setBackgroundError] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null); // 배경(컬러 또는 이미지)
  const [isColorSelected, setIsColorSelected] = useState(true); // 컬러/이미지 탭 상태
  const navigate = useNavigate();

  // 외부 이미지 URL로 설정
  const images = [
    "https://images.pexels.com/photos/28184434/pexels-photo-28184434.jpeg", // image1
    "https://images.pexels.com/photos/30481070/pexels-photo-30481070.jpeg", // image2
    "https://images.pexels.com/photos/30449017/pexels-photo-30449017.jpeg", // image4
    "https://images.pexels.com/photos/17593640/pexels-photo-17593640.jpeg", // image5
  ];

  // 수신자 입력 핸들러
  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
    setError(e.target.value.trim() === "");
  };

  const handleBackgroundChange = (color) => {
    setSelectedBackground(color);
    setBackgroundError(false); // 선택하면 에러 해제
  };

  const handleSubmit = async () => {
    if (!recipient.trim()) {
      setError(true);
      return;
    }
    if (!selectedBackground) {
      setBackgroundError(true);
      return;
    }

    const isColor = ["beige", "purple", "blue", "green"].includes(selectedBackground);
    const isImage = selectedBackground && selectedBackground.startsWith("http");

    const data = {
      team: "13-1",
      name: recipient.trim(),
      backgroundColor: isColor ? selectedBackground : "beige",
      backgroundImageURL: isImage ? selectedBackground : null,
    };

    if (!data.backgroundColor && !data.backgroundImageURL) {
      alert("배경색 또는 배경 이미지를 선택해야 합니다.");
      return;
    }

    console.log("📡 API 요청 데이터:", data);

    try {
      const response = await axios.post(`https://rolling-api.vercel.app/13-1/recipients/`, data, {
        headers: { "Content-Type": "application/json" },
      });

      navigate(`/post/${response.data.id}`);
    } catch (error) {
      console.error("API 요청 중 에러 발생:", error.response?.data || error);
      alert(`오류 발생: ${error.response?.data?.message || "다시 시도해주세요."}`);
    }
  };

  return (
    <div className="mainr">
      <header className="toheader">
        <Link to="/">
          <img className="tologo" src={rolling_icon} alt="롤링 이미지" />
        </Link>
      </header>

      <div className="to-content">
        <label className="to-label">To.</label>
        <input
          type="text"
          className={`to-input ${error ? "error" : ""}`}
          value={recipient}
          onChange={handleRecipientChange}
          placeholder="받는 사람을 입력해주세요"
        />
        {error && <p className="error-message">받는 사람을 입력하세요.</p>}

        <div className="background-selection-text">
          <p className="background-selection-header">배경화면을 선택해 주세요.</p>
          <p className="background-selection-p">컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
        </div>

        <div className="background-selection">
          <div className="tabs">
            <button
              className={`tab ${isColorSelected ? "active" : ""}`}
              onClick={() => setIsColorSelected(true)}
            >
              컬러
            </button>
            <button
              className={`tab ${!isColorSelected ? "active" : ""}`}
              onClick={() => setIsColorSelected(false)}
            >
              이미지
            </button>
          </div>

          {/* 컬러 옵션 */}
          {isColorSelected ? (
            <div className="color-options">
              {[
                { color: "beige", hex: "#ffe2ad" },
                { color: "purple", hex: "#ecd9ff" },
                { color: "blue", hex: "#b1e4ef" },
                { color: "green", hex: "#d0f5c3" },
              ].map(({ color, hex }) => (
                <button
                  key={color}
                  className={`color-option ${selectedBackground === color ? "selected" : ""}`}
                  style={{ backgroundColor: hex }}
                  onClick={() => handleBackgroundChange(color)}
                >
                  {selectedBackground === color && (
                    <img src={checkIcon} alt="선택됨" className="check-icon" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            // 이미지 옵션
            <div className="image-preview">
              {images.map((img, index) => (
                <div key={index} className="image-container">
                  <img
                    src={img}
                    alt={`미리보기-${index}`}
                    className={`preview-image ${selectedBackground === img ? "selected" : ""}`}
                    onClick={() => handleBackgroundChange(img)}
                  />
                  {selectedBackground === img && (
                    <img src={checkIcon} alt="선택됨" className="check-icon" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {backgroundError && <p className="error-message">배경을 선택해주세요.</p>}

        <button className="create-button" onClick={handleSubmit} disabled={!recipient.trim()}>
          생성하기
        </button>
      </div>
    </div>
  );
};

export default ToPageKM;