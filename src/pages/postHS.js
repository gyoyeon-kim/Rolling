import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmojiPicker, {
  Theme,
  EmojiStyle,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";
import "./postHS.css";
import axios from "axios";

// 이미지 import
import logo from "../images/logo.svg";
import arrowBottom from "../images/arrow_bottom.svg";
import addEmoji from "../images/ico_add.svg";
import shareIcon from "../images/share-24.svg";
import plusIcon from "../images/plus.svg";
import deleteIcon from "../images/ico_delete.svg";

// .env에서 키 불러오기
const KAKAO_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

// 이모티콘과 그에 대한 반응 카운트
// const EMOJI_DATA = [
//   { emoji: "🥰", count: 24 },
//   { emoji: "😂", count: 16 },
//   { emoji: "😎", count: 10 },
// ];

// 각 문장마다 다른 폰트 적용하기
const FONT_STYLES = {
  notoSans: { fontFamily: '"Noto-Sans", sans-serif' },
  pretendard: { fontFamily: '"Pretendard", sans-serif' },
  nanumMyeongjo: { fontFamily: '"NanumMyengjo", serif' },
  NanumSonPyeonJiCe: {
    fontFamily: '"NanumSonPyeonJiCe", sans-serif',
    fontSize: "24px",
  },
};

// 배지 컴포넌트
const Badge = ({ type }) => {
  const BADGE_STYLES = {
    지인: { background: "#FFF0D6", color: "#FF8832" }, // 연한 주황색
    동료: { background: "#F8F0FF", color: "#9935FF" }, // 연한 보라색
    가족: { background: "#E4FBDC", color: "#2BA600" }, // 연한 초록색
    친구: { background: "#E2F5FF", color: "#00A2FE" }, // 연한 파란색
  };

  return (
    <em className="badge" style={BADGE_STYLES[type]}>
      {type}
    </em>
  );
};

const dummyData = [
  {
    id: 1,
    name: "홍보희",
    type: "친구",
    message:
      "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
    date: "2023.07.08",
    fontStyle: "NanumSonPyeonJiCe", // 폰트 스타일 추가
  },
  {
    id: 2,
    name: "김경민",
    type: "가족",
    message: "요즘 날씨가 너무 덥죠? 건강 잘 챙기고 맛있는 것도 많이 먹어요!",
    date: "2023.08.02",
    fontStyle: "nanumMyeongjo",
  },
  {
    id: 3,
    name: "김교연",
    type: "동료",
    message: "새로운 프로젝트 시작하느라 고생 많아! 이번에도 화이팅!",
    date: "2023.09.15",
    fontStyle: "notoSans",
  },
  {
    id: 4,
    name: "이성준",
    type: "친구",
    message:
      "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
    date: "2023.07.08",
    fontStyle: "NanumSonPyeonJiCe", // 폰트 스타일 추가
  },
];


function Post() {
  
  // useNavigate 훅 추가
  const navigate = useNavigate();

  // 공유 버튼 상태 관리
  const [isShareOpen, setIsShareOpen] = useState(false);
  // 공유 버튼 및 목록을 감싸는 ref 생성
  const shareRef = useRef(null);
  // 공유 버튼을 클릭하면 상태 변경 (토글)
  const toggleShare = () => {
    setIsShareOpen((prev) => !prev);
  };
  // 외부 클릭 감지 기능 추가
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

  // 이모지 상태 관리
  const [isEmojiListOpen, setIsEmojiListOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const emojiRef = useRef(null);
  const emojiListRef = useRef(null);

  const toggleEmojiList = () => setIsEmojiListOpen((prev) => !prev);
  const toggleEmojiPicker = () => setIsEmojiPickerOpen((prev) => !prev);

  // 외부 클릭 감지 기능 추가 (이모지 피커)
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setIsEmojiPickerOpen(false);
      }
    }
    if (isEmojiPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEmojiPickerOpen]);

  // 외부 클릭 감지 기능 추가 (이모지 리스트)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiListRef.current &&
        !emojiListRef.current.contains(event.target)
      ) {
        setIsEmojiListOpen(false); // 📌 이모지 리스트 외부 클릭 시 닫힘
      }
    }

    if (isEmojiListOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEmojiListOpen]);

  // 이모지 선택 시 처리
  // const onEmojiClick = (emojiData) => {
  //   console.log("선택된 이모지:", emojiData.emoji);
  // };

  const saveRecentEmoji = (emoji) => {
    let recentEmojis = JSON.parse(localStorage.getItem("recentEmojis")) || [];
    if (!recentEmojis.includes(emoji)) {
      recentEmojis.unshift(emoji);
      if (recentEmojis.length > 10) recentEmojis.pop(); // 최대 10개 저장
      localStorage.setItem("recentEmojis", JSON.stringify(recentEmojis));
    }
  };

  // 이모지 선택시 이모지 저장
  const saveEmojiToLocal = (emoji) => {
    let savedEmojis = JSON.parse(localStorage.getItem("savedEmojis")) || []; // 기존 데이터 불러오기
    const existingEmoji = savedEmojis.find((item) => item.emoji === emoji);

    if (existingEmoji) {
      existingEmoji.count += 1; // 이미 있는 이모지는 count 증가
    } else {
      savedEmojis.push({ emoji, count: 1 }); // 새로운 이모지는 추가
    }

    localStorage.setItem("savedEmojis", JSON.stringify(savedEmojis)); // localStorage에 저장
  };

  // 저장된 이모지 불러오기
  const [emojiList, setEmojiList] = useState([]);

  useEffect(() => {
    const storedEmojis = JSON.parse(localStorage.getItem("savedEmojis")) || [];

    // 🔥 count 기준으로 내림차순 정렬
    storedEmojis.sort((a, b) => b.count - a.count);

    setEmojiList(storedEmojis);
  }, []);

  // 이모지 선택시 화면에 반영
  const onEmojiClick = (emojiData) => {
    saveEmojiToLocal(emojiData.emoji);

    setEmojiList((prev) => {
      const updatedList = [...prev];
      const existingEmoji = updatedList.find(
        (item) => item.emoji === emojiData.emoji
      );

      if (existingEmoji) {
        existingEmoji.count += 1;
      } else {
        updatedList.push({ emoji: emojiData.emoji, count: 1 });
      }

      // 🔥 count 기준으로 내림차순 정렬
      return updatedList.sort((a, b) => b.count - a.count);
    });
  };

  // 이모지 카운트 수 상위 3개만 가져오기
  const topEmojis = emojiList.slice(0, 3);

  // 1. 카카오 SDK 초기화 (최초 한 번 실행)
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("895a8d9bc7f49ecd80b506af3cf52365"); // 🔥 카카오 앱 키 입력 (수정 필수)
      }
    }
  }, []);

  // 2. 카카오톡 공유 함수
  const shareKakao = () => {
    if (!window.Kakao) {
      alert(
        "⚠️ 카카오 SDK가 로드되지 않았습니다. 새로고침 후 다시 시도해주세요."
      );
      return;
    }

    if (!window.Kakao.isInitialized()) {
      alert("⚠️ 카카오 SDK가 초기화되지 않았습니다!");
      return;
    }

    if (!window.Kakao.Share) {
      alert("⚠️ Kakao.Share 모듈이 없습니다. 최신 SDK 버전인지 확인하세요.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "롤링페이퍼 공유하기",
        description: "함께 롤링페이퍼를 만들어 보세요!",
        imageUrl: "https://your-image-url.com/image.png", // 🔥 미리보기 이미지 수정 필요
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  };

  useEffect(() => {
    const loadKakaoSDK = () => {
      if (window.Kakao) {
        console.log("✅ Kakao SDK 로드 확인:", window.Kakao);
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
          console.log("✅ Kakao SDK 초기화 완료!");
        }

        if (!window.Kakao.Link) {
          console.log("⚠️ Kakao.Link가 없습니다. Share API를 사용하세요.");
        }
      } else {
        console.error(
          "⚠️ Kakao SDK가 로드되지 않았습니다! 스크립트 추가 확인 필요."
        );
      }
    };

    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = () => loadKakaoSDK();
      document.body.appendChild(script);
    } else {
      loadKakaoSDK();
    }
  }, []);

  // 3. URL 복사 기능
  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("URL이 복사되었습니다!");
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const modalRef = useRef(null);

  // 모달 토글 함수 (카드 정보와 함께 모달 열기)
  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // 외부 클릭 감지하여 모달 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);


// api 데이터 저장 후 불러오기
const [messages, setMessages] = useState([]);

useEffect(() => {
  const fetchMessages = async () => {
    try {
      // ✅ localStorage에서 recipientId 가져오기 (없으면 오류 출력)
      const recipientId = localStorage.getItem("recipientId");

      if (!recipientId) {
        console.error("❌ recipientId가 없습니다. `from.js`에서 메시지를 먼저 보내주세요.");
        return;
      }

      const response = await axios.get(
        `https://rolling-api.vercel.app/13-1/recipients/${recipientId}/messages/`
      );

      console.log("📥 가져온 메시지 데이터:", response.data); // ✅ 콘솔 확인

      if (!response.data || response.data.length === 0) {
        console.warn("⚠️ 메시지가 없습니다. `from.js`에서 메시지를 먼저 보내주세요.");
      }

      setMessages(response.data);
    } catch (error) {
      console.error("❌ 메시지 불러오기 실패:", error);
    }
  };

  fetchMessages();
}, []);





  return (
    <>
      {isModalOpen && selectedCard && (
        <div className="modal">
          <div className="modalContents" ref={modalRef}>
            <div className="modalHeader">
              <div>
                <div className="photo"></div>
                <div className="fromName">
                  <span>
                    From. <em>{selectedCard.name}</em>
                  </span>
                  <Badge type={selectedCard.type} />
                </div>
              </div>
              <span className="date">{selectedCard.date}</span>
            </div>
            <div className="modalBody">
              <p
                className="content"
                style={FONT_STYLES[selectedCard.fontStyle]}
              >
                {selectedCard.message}
              </p>
            </div>
            <div className="modalBtn">
              <button onClick={() => setIsModalOpen(false)}>확인</button>
            </div>
          </div>
        </div>
      )}

      <header>
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="롤링페이퍼 로고" />
          </Link>
          {/* <Link to="/post" className="btn_making">롤링페이퍼 만들기</Link> */}
        </div>
      </header>
      <main>
        <h1 className="blind">보낸 롤링페이퍼 리스트</h1>
        {/* postHeader 시작 */}
        <div className="postHeader">
          <div className="container">
            <div className="leftWrap">
              <p>To. Ashley Kim</p>
            </div>
            <div className="rightWrap">
              <div className="emojiReactionWrap">
                <div className="emojiCollection">
                  <ul className="emojiTop3List">
                    {topEmojis.map((emoji, index) => (
                      <li key={index}>
                        <span>{emoji.emoji}</span>
                        <span>{emoji.count}</span>
                      </li>
                    ))}
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
                  <button
                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                  >
                    <img src={addEmoji} alt="이모지 추가하기" />
                    <span>추가</span>
                  </button>
                  {isEmojiPickerOpen && (
                    <div className="emojiPickerDiv">
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        searchDisabled={false} // 검색 활성화
                        previewConfig={{ showPreview: false }} // 미리보기 비활성화
                        theme={Theme.LIGHT}
                        emojiStyle={EmojiStyle.APPLE}
                        skinTonesDisabled={false} // 스킨톤 선택 활성화
                        suggestedEmojisMode={SuggestionMode.RECENT} // 최근 사용한 이모지 표시
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="shareSnsWrap" ref={shareRef}>
                <button onClick={toggleShare} className="shareBtn">
                  <img src={shareIcon} alt="공유하기" />
                </button>
                {isShareOpen && (
                  <ul className="shareList">
                    <li>
                      <button onClick={shareKakao}>카카오톡 공유</button>
                    </li>
                    <li>
                      <button onClick={copyURL}>URL 복사</button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* postHeader 끝 */}

        <div className="post">
          <div className="container">
            <p className="deletePostCard">
              <button>삭제하기</button>
            </p>
            <ul className="postCard">
              <li className="addPostCard">
                <Link to="/post/message">
                  <span>
                    <img src={plusIcon} alt="이모지 추가하기" />
                  </span>
                </Link>
              </li>
              {/* {messages.map((card) => (
                <li key={card.id} className="savedPostCard">
                  <a role="button" onClick={() => openModal(card)}>
                    <div className="cardInfo">
                      <div>
                        <div className="photo">
                          <img src={card.profileImageURL} alt="프로필 이미지" width="50" />
                        </div>
                        <div className="fromName">
                          <span>
                            From. <em>{card.sender}</em>
                          </span>
                          <Badge type={card.relationship} />
                        </div>
                      </div>
                    </div>
                    <p className="content" style={FONT_STYLES[card.font]}>
                      {card.content}
                    </p>
                    <span className="date">{card.createdAt}</span>
                  </a>
                </li>
              ))} */}

              {dummyData.map((card) => (
                <li key={card.id} className="savedPostCard">
                  <a role="button" onClick={() => openModal(card)}>
                    <div className="cardInfo">
                      <div>
                        <div className="photo"></div>
                        <div className="fromName">
                          <span>
                            From. <em>{card.name}</em>
                          </span>
                          <Badge type={card.type} />
                        </div>
                      </div>
                      {/* <a className="btnDelete">
                        <img src={deleteIcon} alt="삭제하기" />
                      </a> */}
                    </div>
                    <p className="content" style={FONT_STYLES[card.fontStyle]}>
                      {card.message}
                    </p>
                    <span className="date">{card.date}</span>
                  </a>
                </li>
              ))}
              {/* <li className="savedPostCard">
                <a role="button">
                  <div className="cardInfo">
                    <div>
                      <div className="photo"></div>
                      <div className="fromName">
                        <span>
                          From. <em>김동훈</em>
                        </span>
                        <Badge type="가족" />
                      </div>
                    </div>
                    <a className="btnDelete">
                      <img src={deleteIcon} alt="삭제하기" />
                    </a>
                  </div>
                  <p className="content" style={FONT_STYLES.pretendard}>
                    코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
                    조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
                    건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을
                    부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가
                    또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
                    하세요!
                  </p>
                  <span className="date">2023.07.08</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default Post;
