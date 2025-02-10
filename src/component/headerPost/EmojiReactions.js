// components/EmojiPickerComponent.js
import React, { useState, useEffect, useRef } from "react";
import EmojiPicker, { Theme, EmojiStyle, SuggestionMode } from "emoji-picker-react";
import arrowBottom from "../../images/arrow_bottom.svg";
import addEmoji from "../../images/ico_add.svg";
import axios from "axios";

const EmojiReactions = ({ recipientId }) => {
  const [emojiList, setEmojiList] = useState([]);
  const [isEmojiListOpen, setIsEmojiListOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const emojiRef = useRef(null);
  const emojiListRef = useRef(null);

  const toggleEmojiList = () => setIsEmojiListOpen((prev) => !prev);
  const toggleEmojiPicker = () => setIsEmojiPickerOpen((prev) => !prev);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setIsEmojiPickerOpen(false);
      }
      if (emojiListRef.current && !emojiListRef.current.contains(event.target)) {
        setIsEmojiListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 이모지 저장
  const saveEmojiToLocal = (emoji) => {
    let savedEmojis = JSON.parse(localStorage.getItem("savedEmojis")) || {};
    const recipientEmojis = savedEmojis[recipientId] || [];

    const existingEmoji = recipientEmojis.find((item) => item.emoji === emoji);
    if (existingEmoji) {
      existingEmoji.count += 1;
    } else {
      recipientEmojis.push({ emoji, count: 1 });
    }

    savedEmojis[recipientId] = recipientEmojis;
    localStorage.setItem("savedEmojis", JSON.stringify(savedEmojis));
    setEmojiList(savedEmojis[recipientId]);
  };

  // 이모지 API 전송
  const sendEmojiReaction = async (emoji) => {
    try {
      await axios.post(`https://rolling-api.vercel.app/13-1/recipients/${recipientId}/reactions/`, {
        emoji,
        type: "increase",
      });
    } catch (error) {
      console.error("❌ 이모지 전송 실패:", error);
    }
  };

  // 이모지 선택 처리
const onEmojiClick = async (emojiData) => {
  const emoji = emojiData.emoji;

  // 1️⃣ 즉각적인 UI 업데이트
  setEmojiList((prevList) => {
    const updatedList = [...prevList];
    const existingEmoji = updatedList.find((item) => item.emoji === emoji);

    if (existingEmoji) {
      existingEmoji.count += 1;
    } else {
      updatedList.push({ emoji, count: 1 });
    }

    // 👉 로컬 스토리지에 저장 (새로고침 대비)
    localStorage.setItem(`emojiList_${recipientId}`, JSON.stringify(updatedList));

    return updatedList.sort((a, b) => b.count - a.count);
  });

  // 2️⃣ 서버에 이모지 데이터 전송
  try {
    await sendEmojiReaction(emoji);
  } catch (error) {
    console.error("❌ 이모지 전송 실패:", error);
  }
};

// 저장된 이모지 불러오기 (초기화)
const fetchEmojiReactions = async () => {
  // 1️⃣ 로컬 스토리지에서 데이터 가져오기 (빠른 렌더링)
  const localData = localStorage.getItem(`emojiList_${recipientId}`);
  if (localData) {
    setEmojiList(JSON.parse(localData));
  }

  // 2️⃣ 서버 데이터와 동기화 (최신 데이터 반영)
  try {
    const response = await axios.get(
      `https://rolling-api.vercel.app/13-1/recipients/${recipientId}/reactions/`
    );
    const serverData = response.data.results || [];

    // 로컬 데이터와 서버 데이터를 비교하여 최신 데이터로 갱신
    if (JSON.stringify(serverData) !== JSON.stringify(localData)) {
      setEmojiList(serverData);
      localStorage.setItem(`emojiList_${recipientId}`, JSON.stringify(serverData));
    }
  } catch (error) {
    console.error("❌ 이모지 불러오기 실패:", error);
  }
};

// 컴포넌트 마운트 시 데이터 로드
useEffect(() => {
  fetchEmojiReactions();
}, [recipientId]);

  return (
    <div className="emojiReactionWrap">
      <div className="emojiCollection">
        <ul className="emojiTop3List">
          {emojiList.length === 0 ? (
            <li className="emojiNodata">이모티콘을 선택해 주세요!</li>
          ) : (
            emojiList
              .sort((a, b) => b.count - a.count)
              .slice(0, 3)
              .map((emoji, index) => (
                <li key={index}>
                  <span>{emoji.emoji}</span>
                  <span>{emoji.count}</span>
                </li>
              ))
          )}
        </ul>

        <div className="emojiAllList" ref={emojiListRef}>
          <button onClick={toggleEmojiList}>
            <img src={arrowBottom} alt="이모지 전체보기" />
          </button>
          {isEmojiListOpen && (
            <ul>
              {emojiList.map((emoji, index) => (
                <li key={index}>
                  <span>{emoji.emoji}</span>
                  <span>{emoji.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="emojiPicker" ref={emojiRef}>
        <button onClick={toggleEmojiPicker}>
          <img src={addEmoji} alt="이모지 추가하기" />
          <span>추가</span>
        </button>
        {isEmojiPickerOpen && (
          <div className="emojiPickerDiv">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              searchDisabled={false}
              previewConfig={{ showPreview: false }}
              theme={Theme.LIGHT}
              emojiStyle={EmojiStyle.APPLE}
              skinTonesDisabled={false}
              suggestedEmojisMode={SuggestionMode.RECENT}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiReactions;
