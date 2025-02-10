import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navigation from "../component/Navigation";
/* import HeaderBH from "../ComponentsBH/HeaderBH";
/*import EmojiButton from "../component/EmojiButton";*/
import point02 from "../images/Group2 43 (1).png";
import main_ex from "../images/main-ex1.jpg";
import main_ex2 from "../images/main-ex2.jpg";
import CardImg from "../images/CardList.svg";
import CursorEffect from "../component/commons/CursorEffect";

function Home() {
  return (
    <>
      <CursorEffect />
      <Navigation />
      <main className="home-container">
        {/* 서비스 소개 섹션 */}
        <section className="emoji-section">
          {/* 추가된 클래스 'emoji-layout'를 통해 별도 스타일 적용 */}
          <div className="point-container emoji-layout2">
            {/* 왼쪽에 위치할 이미지 영역 */}

            {/* 오른쪽에 위치할 텍스트 영역 */}
            <div className="emoji-text">
              <h2 className="point-title">Point.01</h2>
              <h3 className="point-subtitle">
                누구나 손쉽게, 온라인 <br />
                롤링 페이퍼를 만들 수 있어요
              </h3>
              <p className="point-description">
                로그인 없이 자유롭게 만들어요.
              </p>
            </div>
            <div className="emoji-image">
              <img src={CardImg} alt="이모티콘 이미지" />
            </div>
          </div>
        </section>

        {/* 이모지 섹션 */}

        <section className="emoji-section">
          {/* 추가된 클래스 'emoji-layout'를 통해 별도 스타일 적용 */}
          <div className="point-container emoji-layout">
            {/* 왼쪽에 위치할 이미지 영역 */}

            {/* 오른쪽에 위치할 텍스트 영역 */}
            <div className="emoji-text">
              <h2 className="point-title">Point.02</h2>
              <h3 className="point-subtitle">
                서로에게 이모지로 감정을
                <br /> 표현해보세요
              </h3>
              <p className="point-description">
                롤링 페이퍼에 이모지를 추가할 수 있어요.
              </p>
            </div>
            <div className="emoji-image">
              <img src={point02} alt="이모티콘 이미지" />
            </div>
          </div>
          <div className="explore section">
            <Link to="/list" className="explore-button">
              구경하러 가기
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
