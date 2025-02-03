import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navigation from "../component/Navigation";

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

            {/* 오른쪽에 카드가 2개 있고 + 버튼이 있는 형태 */}
            <div className="card-wrapper">
              {/* 첫 번째 카드 */}
              <div className="card">
                <div className="card-header">
                  <div className="card-profile-image">
                    {/* 여기서 실제 이미지 경로나 URL로 변경 */}
                    <img src="/path/to/profile1.jpg" alt="프로필1" />
                  </div>
                  <div className="card-author-info">
                    <span className="card-author">
                      From. 이성준{" "}
                      <span className="card-relationship">친구</span>
                    </span>
                    <span className="card-date">2025.1.29</span>
                  </div>
                </div>
                <p className="card-content">여러분의 치아는 안녕하신가요?</p>
              </div>

              {/* 두 번째 카드 */}
              <div className="card">
                <div className="card-header">
                  <div className="card-profile-image">
                    <img src="/path/to/profile2.jpg" alt="프로필2" />
                  </div>
                  <div className="card-author-info">
                    <span className="card-author">
                      From. 이성준{" "}
                      <span className="card-relationship">동료</span>
                    </span>
                    <span className="card-date">2025.01.30</span>
                  </div>
                </div>
                <p className="card-content">
                  일교차가 큰 시기입니다. 모두 건강 잘 챙기세요!
                </p>
              </div>

              {/* + 버튼 카드 , To page연결*/}
              <div className="card-placeholder">+</div>
            </div>
          </div>
        </section>

        {/* 이모지 섹션 */}
        <section className="emoji-section">
          <div className="point-container">
            <h2 className="point-title">Point.02</h2>
            <h3 className="point-subtitle">
              서로에게 이모지로 감정을 표현해보세요
            </h3>
            <p className="point-description">
              롤링 페이퍼에 이모지를 추가할 수 있어요!
            </p>

            <div className="emoji-preview">
              <div className="emoji-display">
                <button type="button">👍 10</button>
                <button type="button">😍 24</button>
                <button type="button">🥺 10</button>
                <button type="button">👏 8</button>
                <button type="button">...</button>
              </div>
              <button type="button" className="emoji-add-btn">
                추가
              </button>
            </div>
          </div>
          {/* 구경해보기 버튼 */}
        </section>
        <section className="explore section">
          <Link to="/list" className="explore-button">
            구경하러 가기
          </Link>
        </section>
      </main>
    </>
  );
}

export default Home;
