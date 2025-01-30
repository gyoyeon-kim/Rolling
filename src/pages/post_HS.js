import React from "react";
import "./post_HS.css";

// 이미지 import
import logo from "../images/logo.svg";
import arrowBottom from "../images/arrow_bottom.svg";
import addEmoji from "../images/ico_add.svg";
import plusIcon from "../images/plus.svg";
import deleteIcon from "../images/ico_delete.svg";

function Post() {
  // 이모티콘과 그에 대한 반응 카운트
  const EMOJI_DATA = [
    { emoji: "🥰", count: 24 },
    { emoji: "😂", count: 16 },
    { emoji: "😎", count: 10 },
    // 추가적인 이모티콘도 필요에 따라 여기에 추가할 수 있음
  ];

  return (
    <>
      <header>
        <div className="container">
          <a href="#" className="logo">
            <img src={logo} alt="롤링페이퍼 로고" />
          </a>
          <a href="#" className="btn_making">롤링페이퍼 만들기</a>
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
                        <em>{emoji.emoji}</em><span>{emoji.count}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="emojiAllList">
                    <button>
                      <img src={arrowBottom} alt="이모지 전체보기" />
                    </button>
                    <ul>
                      {EMOJI_DATA.map((emoji, index) => (
                        <li key={index}>
                          <em>{emoji.emoji}</em><span>{emoji.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="emojiPicker">
                  <button>
                    <img src={addEmoji} alt="이모지 추가하기" />추가
                  </button>
                  <div></div>
                </div>
              </div>
              <div className="shareSnsWrap">
                <button>
                  <img src={addEmoji} alt="이모지 추가하기" />
                </button>
                <ul>
                  <li>카카오톡 공유</li>
                  <li>URL 공유</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* postHeader 끝 */}

        <div className="post">
          <ul className="postCardContainer">
            <li className="addPostCard">
              <a href="#">
                <span>
                  <img src={plusIcon} alt="이모지 추가하기" />
                </span>
              </a>
            </li>
            <li className="savedPostCard">
              <a href="#">
                <div className="cardInfo">
                  <div className="photo"></div>
                  <div className="fromName"></div>
                  <a className="btnDelete">
                    <img src={deleteIcon} alt="삭제하기" />
                  </a>
                </div>
                <p className="content">
                  코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두
                  조심 또 하세요! 코로나가 또다시 기승을 부리는 요즘이네요.
                  건강, 체력 모두 조심 또 하세요!
                </p>
                <span className="date">2023.07.08</span>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}

export default Post;
