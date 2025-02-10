// components/ShareButtons.js
import React, { useRef, useEffect, useState } from "react";
import "./ShareButtons.css";
import shareIcon from "../../images/share-24.svg";
import { shareKakao } from "./utils/kakaoShare";
import { copyURL } from "./utils/copyURL";

const ShareButtons = ({ backgroundImage, backgroundColor }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareRef = useRef(null);

  const toggleShare = () => {
    setIsShareOpen((prev) => !prev);
  };

  // 외부 클릭 감지 기능
  useEffect(() => {
      function handleClickOutside(event) {
        if (shareRef.current && !shareRef.current.contains(event.target)) {
          setIsShareOpen(false);
        }
      }
  
      if (isShareOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isShareOpen]);

  return (
    <div className="shareSnsWrap" ref={shareRef}>
        <button onClick={toggleShare} className="shareBtn">
            <img src={shareIcon} alt="공유하기" />
        </button>
        {isShareOpen && (
            <ul className="shareList">
              <li>
                <button onClick={() => shareKakao(backgroundImage, backgroundColor)}>
                  카카오톡 공유
                </button>
              </li>
              <li>
                <button onClick={copyURL}>URL 복사</button>
              </li>
            </ul>
        )}
    </div>
  );
};

export default ShareButtons;
