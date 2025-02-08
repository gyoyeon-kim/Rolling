import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import rolling_icon from "../images/logo.svg";
import image1 from "../images/to_img/image_1.png";
import image2 from "../images/to_img/image_2.png";
import checkIcon from "../images/to_img/image_3.png";
import "./ToPageKM.css";

const ToPageKM = () => {
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState(false);
  const [images, setImages] = useState([image1, image2, image1, image2]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [isColorSelected, setIsColorSelected] = useState(true);
  const navigate = useNavigate();

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
    setError(e.target.value.trim() === "");
  };

  // 배경 변경 핸들러 (컬러 선택)
  const handleBackgroundChange = (color) => {
    setSelectedBackground(color);
    setImages([]); 
  };

  const handleSubmit = () => {
    if (!recipient.trim()) {
      setError(true);
      return;
    }
    navigate(`/post/${recipient}`);
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
                  className="color-option"
                  style={{ backgroundColor: color }}
                  onClick={() => handleBackgroundChange(color)}
                >
                  {selectedBackground === color && (
                    <img src={checkIcon} alt="선택됨" className="check-icon" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="image-preview">
                {images.map((img, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={img}
                      alt={`미리보기-${index}`}
                      className="preview-image"
                      onClick={() => setSelectedBackground(img)}
                    />
                    {selectedBackground === img && (
                      <img src={checkIcon} alt="선택됨" className="check-icon" />
                    )}
                  </div>
                ))}
              </div>
            </>
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
