import React, { useState } from "react";
import "./EmojiButton.css";

function EmojiButton({ emoji, count }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    // 버튼 클릭 시 애니메이션을 실행
    setIsAnimating(true);
    // 이 부분에 클릭 시 카운트를 증가시키거나 다른 동작을 추가할 수 있음
  };

  const handleAnimationEnd = () => {
    // 애니메이션이 끝나면 애니메이션 클래스를 제거
    setIsAnimating(false);
  };

  return (
    <button
      type="button"
      className={`emoji-btn ${isAnimating ? "animate" : ""}`}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      {emoji} {count}
    </button>
  );
}

export default EmojiButton;
