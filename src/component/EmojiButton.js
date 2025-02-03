import React, { useState } from "react";
import "./EmojiButton.css";

function EmojiButton({ emoji, onAddEmoji }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    // 부모 컴포넌트에 선택한 이모지 전달
    onAddEmoji(emoji);
    // 애니메이션 실행
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    // 애니메이션 종료 후 상태 초기화
    setIsAnimating(false);
  };

  return (
    <button
      type="button"
      className={`emoji-btn ${isAnimating ? "animate" : ""}`}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      {emoji}
    </button>
  );
}

export default EmojiButton;
