import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import rolling_icon from "../images/logo.svg";
import checkIcon from "../images/to_img/image_3.svg";
import axios from "axios";
import CursorEffect from "../component/commons/CursorEffect"; // 🆕 커서 이펙트 가져오기
import "./ToPageKM.css";

const ToPageKM = () => {
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState(false);
  const [backgroundError, setBackgroundError] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [isColorSelected, setIsColorSelected] = useState(true);
  const [customImages, setCustomImages] = useState([
    "https://images.pexels.com/photos/28184434/pexels-photo-28184434.jpeg",
    "https://images.pexels.com/photos/30481070/pexels-photo-30481070.jpeg",
    "https://images.pexels.com/photos/30449017/pexels-photo-30449017.jpeg",
    "https://images.pexels.com/photos/17593640/pexels-photo-17593640.jpeg",
  ]);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
    setError(e.target.value.trim() === "");
  };

  const handleBackgroundChange = (value) => {
    setSelectedBackground(value);
    setBackgroundError(false);
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setCustomImages([...customImages, imageUrl]);
      setImageUrl("");
      setShowUrlInput(false);
    }
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

    try {
      const response = await axios.post(
        `https://rolling-api.vercel.app/13-1/recipients/`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigate(`/post/${response.data.id}`);
    } catch (error) {
      console.error("API 요청 중 에러 발생:", error.response?.data || error);
      alert(`오류 발생: ${error.response?.data?.message || "다시 시도해주세요."}`);
    }
  };

  return (
    <div className="mainr">
      <CursorEffect /> {/* 🆕 커서 이펙트 추가 */}
      
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
            <div className="image-preview">
              <div className="add-image-button" onClick={() => setShowUrlInput(true)}>
                +
              </div>
              {customImages.map((img, index) => (
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

        <button
          className="create-button"
          onClick={handleSubmit}
          disabled={!recipient.trim()}
        >
          생성하기
        </button>

        {showUrlInput && (
          <div className="url-popup">
            <div className="url-popup-content">
              <input
                type="text"
                placeholder="이미지 URL 입력"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <button onClick={handleAddImage}>추가</button>
              <button onClick={() => setShowUrlInput(false)}>취소</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToPageKM;
