import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navigation from "../component/Navigation";
/* import HeaderBH from "../ComponentsBH/HeaderBH";
/*import EmojiButton from "../component/EmojiButton";*/
import point02 from "../images/Point02.png";
import main_ex from "../images/main-ex1.jpg";
import main_ex2 from "../images/main-ex2.jpg";

function Home() {
  return (
    <>
      <Navigation />
      <main className="home-container">
        {/* 서비스 소개 섹션 */}
        <section>
          <div className="point-container">
            <h2 className="point-title">Point.01</h2>
            <h3 className="point-subtitle">
              누구나 손쉽게, 온라인 <br /> 롤링 페이퍼를 만들 수 있어요
            </h3>
            <p className="point-description">로그인 없이 자유롭게 만들어요.</p>

            {/* 왼쪽에 카드 2개 + 버튼이 있는 형태 */}
            <div className="card-wrapper">
              {/* 첫 번째 카드 */}
              <div className="home-card">
                <div className="card-header">
                  <div className="card-profile-image">
                    {/* 여기서 실제 이미지 경로나 URL로 변경 */}
                    <img src={main_ex} alt="프로필1" />
                  </div>
                  <div className="card-author-info">
                    <span className="card-author">
                      From. <span className="card-user">2파트 1팀</span>
                      <span className="card-relationship-friend">친구</span>
                    </span>
                  </div>
                </div>
                <p className="Home-card-content">
                  이성준 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  <br />
                  김교연 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  <br />
                  이현선 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  <br />
                  김경민 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  <br />
                  홍보희 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                </p>
                <span className="card-date">2025.1.29</span>
              </div>

              {/* 두 번째 카드 */}
              <div className="home-card">
                <div className="card-header">
                  <div className="card-profile-image">
                    <img src={main_ex2} alt="프로필2" />
                  </div>
                  <div className="card-author-info">
                    <span className="card-author">
                      From. <span className="card-user"> 2파트 1팀</span>
                      <span className="card-relationship">동료</span>
                    </span>
                  </div>
                </div>
                <p className="Home-card-content">
                  이성준 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  <br />
                  김교연 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  <br />
                  이현선 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  <br />
                  김경민 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  <br />
                  홍보희 : ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                </p>

                <span className="card-date">2025.01.30</span>
              </div>

              {/* + 버튼 카드 , To page연결*/}
              <Link to="/post" className="card-placeholder">
                +
              </Link>
            </div>
          </div>
        </section>

        {/* 이모지 섹션 */}

        <section className="emoji-section">
          {/* 추가된 클래스 'emoji-layout'를 통해 별도 스타일 적용 */}
          <div className="point-container emoji-layout">
            {/* 왼쪽에 위치할 이미지 영역 */}
            <div className="emoji-image">
              <img src={point02} alt="이모티콘 이미지" />
            </div>
            {/* 오른쪽에 위치할 텍스트 영역 */}
            <div className="emoji-text">
              <h2 className="point-title">Point.02</h2>
              <h3 className="point-subtitle">
                서로에게 이모지로 감정을 표현해보세요
              </h3>
              <p className="point-description">
                롤링 페이퍼에 이모지를 추가할 수 있어요!
              </p>
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
