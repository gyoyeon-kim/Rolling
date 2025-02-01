import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmojiPicker, { Theme, EmojiStyle,SuggestionMode, SkinTonePickerLocation,} from "emoji-picker-react";
import "./postHS.css";

// 이미지 import
import logo from "../images/logo.svg";
import arrowBottom from "../images/arrow_bottom.svg";
import addEmoji from "../images/ico_add.svg";
import shareIcon from "../images/share-24.svg";
import plusIcon from "../images/plus.svg";
import deleteIcon from "../images/ico_delete.svg";

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

// 이모티콘과 그에 대한 반응 카운트
const EMOJI_DATA = [
  { emoji: "🥰", count: 24 },
  { emoji: "😂", count: 16 },
  { emoji: "😎", count: 10 },
];

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

// .env에서 키 불러오기
const KAKAO_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

function Post() {

  // useNavigate 훅 추가
  const navigate = useNavigate();

  // 공유 버튼 상태 관리
  const [isShareOpen, setIsShareOpen] = useState(false);

  // 공유 버튼을 클릭하면 상태 변경 (토글)
  const toggleShare = () => {
    setIsShareOpen((prev) => !prev);
  };

  // 이모지 상태 관리
  const [isEmojiListOpen, setIsEmojiListOpen] = useState(false);

  // 이모지 리스트 토글
  const toggleEmojiList = () => setIsEmojiListOpen(prev => !prev);

  // 이모지 피커 상태
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const toggleEmojiPicker = () => setIsEmojiPickerOpen((prev) => !prev);

  // 이모지 선택 시 처리
  const onEmojiClick = (event, emojiObject) => {
    console.log("선택된 이모지:", emojiObject.emoji);
  };

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
      alert("⚠️ 카카오 SDK가 로드되지 않았습니다. 새로고침 후 다시 시도해주세요.");
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
        console.error("⚠️ Kakao SDK가 로드되지 않았습니다! 스크립트 추가 확인 필요.");
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

  return (
    <>
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
                    {EMOJI_DATA.map((emoji, index) => (
                      <li key={index}>
                        <em>{emoji.emoji}</em>
                        <span>{emoji.count}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="emojiAllList">
                    <button onClick={toggleEmojiList}>
                        <img src={arrowBottom} alt="이모지 전체보기" />
                      </button>
                      {isEmojiListOpen && (
                        <ul>
                          {EMOJI_DATA.map((emoji, index) => (
                            <li key={index}>
                              <em>{emoji.emoji}</em><span>{emoji.count}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </div>
                <div className="emojiPicker">
                  <button onClick={toggleEmojiPicker}>
                    <img src={addEmoji} alt="이모지 추가하기" />
                    <span>추가</span>
                  </button>
                  {isEmojiPickerOpen && (
                    <div className="emojiPickerDiv">
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        width="320px"
                        height="400px"
                        searchDisabled={false} // 🔥 검색 기능 활성화
                        previewConfig={{ showPreview: false }} // 🔥 미리보기 비활성화
                        theme={Theme.LIGHT} // 🔥 라이트 테마 적용 (DARK / AUTO 가능)
                        emojiStyle={EmojiStyle.APPLE} // 🔥 애플 스타일 이모지 적용
                        skinTonesDisabled={false} // 🔥 스킨톤 선택 활성화
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="shareSnsWrap">
                <button onClick={toggleShare} className="shareBtn">
                  <img src={shareIcon} alt="공유하기" />
                </button>
                {/* 공유 목록: isShareOpen이 true일 때만 보이게 */}
                <ul className={`shareList ${isShareOpen ? "active" : "hidden"}`}>
                  <li><button onClick={shareKakao}>카카오톡 공유</button></li>
                  <li><button onClick={copyURL}>URL 복사</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* postHeader 끝 */}

        <div className="post">
          <div className="container">
            <ul className="postCard">
              <li className="addPostCard">
                <Link to="/post/message">
                  <span>
                      <img src={plusIcon} alt="이모지 추가하기" />
                  </span>
                </Link>
              </li>
              <li className="savedPostCard">
                <a role="button">
                  <div className="cardInfo">
                    <div>
                      <div className="photo"></div>
                      <div className="fromName">
                        <span>
                          From. <em>김동훈</em>
                        </span>
                        <Badge type="친구" />
                      </div>
                    </div>
                    <a className="btnDelete">
                      <img src={deleteIcon} alt="삭제하기" />
                    </a>
                  </div>
                  <p className="content" style={FONT_STYLES.nanumMyeongjo}>
                    코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
                    조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
                    건강, 체력 모두 조심 또 하세요!
                  </p>
                  <span className="date">2023.07.08</span>
                </a>
              </li>
              <li className="savedPostCard">
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
              </li>
              <li className="savedPostCard">
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
                  <p className="content" style={FONT_STYLES.NanumSonPyeonJiCe}>
                    코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
                    조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
                    건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을
                    부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가
                    또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
                    하세요!
                  </p>
                  <span className="date">2023.07.08</span>
                </a>
              </li>
              <li className="savedPostCard">
                <a role="button">
                  <div className="cardInfo">
                    <div>
                      <div className="photo"></div>
                      <div className="fromName">
                        <span>
                          From. <em>김동훈</em>
                        </span>
                        <Badge type="동료" />
                      </div>
                    </div>
                    <a className="btnDelete">
                      <img src={deleteIcon} alt="삭제하기" />
                    </a>
                  </div>
                  <p className="content" style={FONT_STYLES.NanumSonPyeonJiCe}>
                    코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
                    조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
                    건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을
                    부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가
                    또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
                    하세요!
                  </p>
                  <span className="date">2023.07.08</span>
                </a>
              </li>
              <li className="savedPostCard">
                <a role="button">
                  <div className="cardInfo">
                    <div>
                      <div className="photo"></div>
                      <div className="fromName">
                        <span>
                          From. <em>김동훈</em>
                        </span>
                        <Badge type="지인" />
                      </div>
                    </div>
                    <a className="btnDelete">
                      <img src={deleteIcon} alt="삭제하기" />
                    </a>
                  </div>
                  <p className="content" style={FONT_STYLES.NanumSonPyeonJiCe}>
                    코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
                    조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
                    건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을
                    부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가
                    또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
                    하세요!
                  </p>
                  <span className="date">2023.07.08</span>
                </a>
              </li>
              <li className="savedPostCard">
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
                  <p className="content" style={FONT_STYLES.NanumSonPyeonJiCe}>
                    코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
                    조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
                    건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을
                    부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가
                    또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
                    하세요!
                  </p>
                  <span className="date">2023.07.08</span>
                </a>
              </li>
              <li className="savedPostCard">
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
                  <p className="content" style={FONT_STYLES.NanumSonPyeonJiCe}>
                    코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
                    조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
                    건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을
                    부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가
                    또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
                    하세요!
                  </p>
                  <span className="date">2023.07.08</span>
                </a>
              </li>
              <li className="savedPostCard">
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
                  <p className="content" style={FONT_STYLES.NanumSonPyeonJiCe}>
                    코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
                    조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
                    건강, 체력 모두 조심 또 하세요! 코로나가 또다시 기승을
                    부리는 요즘이네요. 건강, 체력 모두 조심 또 하세요! 코로나가
                    또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
                    하세요!
                  </p>
                  <span className="date">2023.07.08</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default Post;
