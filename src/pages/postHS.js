import React, { useCallback, useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmojiPicker, { Theme, EmojiStyle, SuggestionMode, SkinTonePickerLocation,} from "emoji-picker-react";
import "./postHS.css";
import axios from "axios";
import CursorEffect from "./CursorEffect";

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
  notoSans: { fontFamily: '"Noto Sans", sans-serif' },
  pretendard: { fontFamily: '"Pretendard", sans-serif' },
  nanumMyeongjo: { fontFamily: '"나눔명조", serif' },
  NanumSonPyeonJiCe: {
    fontFamily: '"나눔손글씨 손편지체", sans-serif',
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

// const dummyData = [
//   {
//     id: 1,
//     name: "홍보희",
//     type: "친구",
//     message:
//       "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
//     date: "2023.07.08",
//     fontStyle: "NanumSonPyeonJiCe", // 폰트 스타일 추가
//   },
//   {
//     id: 2,
//     name: "김경민",
//     type: "가족",
//     message: "요즘 날씨가 너무 덥죠? 건강 잘 챙기고 맛있는 것도 많이 먹어요!",
//     date: "2023.08.02",
//     fontStyle: "nanumMyeongjo",
//   },
//   {
//     id: 3,
//     name: "김교연",
//     type: "동료",
//     message: "새로운 프로젝트 시작하느라 고생 많아! 이번에도 화이팅!",
//     date: "2023.09.15",
//     fontStyle: "notoSans",
//   },
//   {
//     id: 4,
//     name: "이성준",
//     type: "친구",
//     message:
//       "코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요!",
//     date: "2023.07.08",
//     fontStyle: "NanumSonPyeonJiCe", // 폰트 스타일 추가
//   },
// ];


const Post = () => {
  
  // useNavigate 훅 추가
  const navigate = useNavigate();


  // api 데이터 저장 후 불러오기
  const { id } = useParams(); // URL에서 recipientId 가져오기
  console.log("🟢 Post_HS - URL에서 가져온 id:", id);

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
  const saveEmojiToLocal = (recipientId, emoji) => {
    let savedEmojis = JSON.parse(localStorage.getItem("savedEmojis")) || {}; // 객체 형태로 저장
    const recipientEmojis = savedEmojis[recipientId] || []; // 해당 recipient의 이모지 데이터 가져오기
  
    const existingEmoji = recipientEmojis.find((item) => item.emoji === emoji);
  
    if (existingEmoji) {
      existingEmoji.count += 1; // 이미 있는 이모지는 count 증가
    } else {
      recipientEmojis.push({ emoji, count: 1 }); // 새로운 이모지는 추가
    }
  
    savedEmojis[recipientId] = recipientEmojis; // recipientId별로 저장
    localStorage.setItem("savedEmojis", JSON.stringify(savedEmojis)); // localStorage에 저장
  };

  // 저장된 이모지 불러오기
  const [emojiList, setEmojiList] = useState([]);

  useEffect(() => {
    const storedEmojis = JSON.parse(localStorage.getItem("savedEmojis")) || {};
    setEmojiList(storedEmojis[id] || []); // 해당 recipientId의 이모지만 불러오기
  }, [id]);

  // 이모지 선택시 화면에 반영
  const onEmojiClick = async (recipientId, emojiData) => {
    saveEmojiToLocal(recipientId, emojiData.emoji); // 이모지 저장
  
    setEmojiList((prev) => {
      const updatedList = [...prev];
      const existingEmoji = updatedList.find((item) => item.emoji === emojiData.emoji);
      
      if (existingEmoji) {
        existingEmoji.count += 1;
      } else {
        updatedList.push({ emoji: emojiData.emoji, count: 1 });
      }
  
      return updatedList; // 🔥 정렬하지 않고 그대로 반환 (정렬을 useEffect에서 수행)
    });
  };
  
  // ✅ useEffect를 활용한 정렬 보장
  useEffect(() => {
    setEmojiList((prev) => [...prev].sort((a, b) => b.count - a.count));
  }, [emojiList]); // 🔥 emojiList가 변경될 때마다 정렬 실행
  
  
  
  

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

    // const finalImage = backgroundImage 
    // ? backgroundImage 
    // : `https://singlecolorimage.com/get/${backgroundColor.replace("#", "")}/500x500`;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "따뜻한 마음을 전해보세요",
        description: "추억을 담은 롤링페이퍼로 소중한 사람에게 따뜻한 한마디를 남겨보세요!",
        imageUrl: "https://rolling-navy.vercel.app/sharebg_kakao.png", // 미리보기 이미지
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "💌 마음 전하기 💌", // 버튼 이름
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
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
  //삭제모달 상태 추가
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 모달 토글 함수 (카드 정보와 함께 모달 열기)
  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };
  // 삭제 모달 열기
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // 모달 닫기 함수 (일반 모달 + 삭제 모달)
  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false); // 삭제 모달도 닫기
  };


  // 외부 클릭 감지하여 모달 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        closeModal();
      }
    }

    if (isModalOpen || isDeleteModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isDeleteModalOpen]);

// 메시지 상태 관리
const [messages, setMessages] = useState([]); // api에서 가져온 메세지 저장
const [loading, setLoading] = useState(true); // 로딩 상태 관리
const [backgroundImage, setBackgroundImage] = useState(""); // 배경 이미지
const [backgroundColor, setBackgroundColor] = useState(""); // 배경 색

// 메시지 가져오기 (GET 요청)
const fetchMessages = async () => {
  try {
    console.log("🟢 API 요청 URL:", `https://rolling-api.vercel.app/13-1/recipients/${id}/messages/?limit=8`);

    const response = await axios.get(`https://rolling-api.vercel.app/13-1/recipients/${id}/messages/?limit=8`);
    console.log("📩 API 응답 데이터:", response.data);

    if (response.data.results) {
      setMessages(response.data.results);
    } else {
      console.error("❌ API 응답에서 results 배열이 없습니다.");
    }
  } catch (error) {
    console.error("❌ 메시지 불러오기 실패:", error);
  } finally {
    setLoading(false);
  }
};

//수신자 정보 가져오기 별도
const fetchRecipientData = async () => {
  try {
    console.log("🎯 수신자 정보 API 요청:", `https://rolling-api.vercel.app/13-1/recipients/${id}/`);
    
    const response = await axios.get(`https://rolling-api.vercel.app/13-1/recipients/${id}/`);
    console.log("📥 수신자 데이터:", response.data);

    // 배경 이미지와 색상 설정
    setBackgroundImage(response.data.backgroundImageURL || "");
    setBackgroundColor(response.data.backgroundColor || "var(--beige-200)");

  } catch (error) {
    console.error("❌ 수신자 정보 불러오기 실패:", error);
  }
};


// useEffect에서 메시지 불러오기 실행
useEffect(() => {
  if (!id) {
    console.error("❌ recipientId가 없습니다.");
    setLoading(false);
    return;
  }

  fetchRecipientData();  // 배경 이미지 및 색상 가져오기
  fetchMessages();       // 메시지 가져오기
}, [id]);



  return (
    <>
      <CursorEffect /> 
      {isModalOpen && selectedCard && (
        <div className="modal">
          <div className="modalContents" ref={modalRef}>
            <div className="modalHeader">
              <div>
                <div className="photo" style={{ backgroundImage: `url(${selectedCard.profileImageURL})` }}></div>
                <div className="fromName">
                  <span>
                    From. <em>{selectedCard.sender}</em>
                  </span>
                  <Badge type={selectedCard.relationship} />
                </div>
              </div>
              <span className="date">
                {new Date(selectedCard.createdAt).toISOString().split("T")[0].replace(/-/g, ".")}
              </span>
            </div>

            <div className="modalBody">
              <p
                className="content"
                style={{ 
                  fontFamily: selectedCard.font, 
                  color: selectedCard.textColor || "#000",
                  fontSize: selectedCard.font === "나눔손글씨 손편지체" ? "24px" : selectedCard.fontSize || "18px",
                  fontWeight: selectedCard.fontWeight || "normal", 
                  fontStyle: selectedCard.fontStyle || "normal"
                }}
              >
                {selectedCard.content.replace(/<[^>]+>/g, '')}
              </p>
            </div>

            <div className="modalBtn">
              <button onClick={() => setIsModalOpen(false)}>확인</button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div class="modal deleteMessageWrap">
          <div className="modalContents" ref={modalRef}>
            <strong>메세지를 삭제하려면<br/>비밀번호를 입력해주세요.</strong>
            <div className="">
              <label for="pw"></label>
              <input type="password" id="pw" placeholder="비밀번호 입력"/>
            </div>
            <div className="modalBtn">
              <button className="">확인</button>
              <button className="cancelBtn" onClick={closeModal}>취소</button>
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
              <p>To. {id}</p>
            </div>
            <div className="rightWrap">
              <div className="emojiReactionWrap">
                <div className="emojiCollection">
                  <ul className="emojiTop3List">
                  <ul className="emojiTop3List">
                    {emojiList.slice(0, 3).map((emoji, index) => (
                      <li key={index}>
                        <span>{emoji.emoji}</span>
                        <span>{emoji.count}</span>
                      </li>
                    ))}
                  </ul>
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
                        onEmojiClick={(emojiData) => onEmojiClick(id, emojiData)}
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

        {/* 🔥 2️⃣ 메시지 로딩 상태 표시 */}
        {loading ? (
          <p>📩 메시지를 불러오는 중...</p>
        ) : (
          <div className="post"
            style={{ 
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
              backgroundColor: backgroundColor || "var(--beige-200)"
            }}
          >
            <div className="container">
              {/* <p className="deletePostCard">
                <button>삭제하기</button>
              </p> */}
              <ul className="postCard">
                <li className="addPostCard">
                  <Link to={`/post/${id}/message`}>
                    <span><img src={plusIcon} alt="추가하기" /></span>
                  </Link>
                </li>

                {/* 🔥 3️⃣ API에서 불러온 메시지 리스트 출력 */}
                {Array.isArray(messages) && messages.length > 0 && (
                  messages.map((msg) => (
                    <li key={msg.id} className="savedPostCard">
                      <a role="button" onClick={() => openModal(msg)}>
                        <div className="cardInfo">
                          <div>
                            <div className="photo" style={{ backgroundImage: `url(${msg.profileImageURL})`}}></div>
                            <div className="fromName">
                              <span>From. <em>{msg.sender}</em></span>
                              <Badge type={msg.relationship} />
                            </div>
                          </div>
                          <a className="btnDelete" 
                            onClick={(e) => {
                              e.stopPropagation(); // 💡 부모 클릭 이벤트 차단
                              openDeleteModal();
                            }}
                          >
                            <img src={deleteIcon} alt="삭제하기" />
                          </a>
                        </div>
                          <p 
                            className="content"
                            style={{ fontFamily: msg.font, 
                              color: msg.textColor || "#000", 
                              fontSize: msg.font === "나눔손글씨 손편지체" ? "24px" : msg.fontSize || "18px",
                              fontWeight: msg.fontWeight || "normal", 
                              fontStyle: msg.fontStyle || "normal"
                            }}
                          >
                            {msg.content.replace(/<[^>]+>/g, '')}
                          </p>

                          <span className="date">
                            {new Date(msg.createdAt).toISOString().split("T")[0].replace(/-/g, ".")}
                          </span>
                      </a>
                    </li>
                  ))
                )}

              {/* {dummyData.map((card) => (
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
                      <a className="btnDelete">
                        <img src={deleteIcon} alt="삭제하기" />
                      </a>
                    </div>
                    <p className="content" style={FONT_STYLES[card.fontStyle]}>
                      {card.message}
                    </p>
                    <span className="date">{card.date}</span>
                  </a>
                </li>
              ))} */}
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
        )}
      </main>
    </>
  );
}

export default Post;
