import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <main className="home-container">
      {/* 서비스 소개 섹션 */}
      <section className="intro-section">
        <div className="point-container">
          <h2 className="point-title">Point.01</h2>
          <h3 className="point-subtitle">
            누구나 손쉽게, 온라인 <br /> 롤링 페이퍼를 만들 수 있어요
          </h3>
          <p className="point-description">로그인 없이 자유롭게 만들어요.</p>
          {/* 오른쪽에 카드가 2개 있고 + 버튼이 있는 형태라고 가정 */}
          <div className="card-wrapper">
            <div className="card">
              <span className="card-author">From. 이성준</span>
              <p className="card-content">여러분의 치아는 안녕하신가요?</p>
              <span className="card-date">2025.1.29</span>
            </div>
            <div className="card">
              <span className="card-author">From. 이성준</span>
              <p className="card-content">
                일교차가 큰 시기입니다. 모두 건강 잘 챙기세요!
              </p>
              <span className="card-date">2025.01.30</span>
            </div>
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
            롤링 페이퍼에 이모지를 추가할 수 있어요.
          </p>
          <div className="emoji-preview">
            <div className="emoji-display">
              <button>👍 10</button>
              <button>😍 24</button>
              <button>🥺 10</button>
              <button>👏 8</button>
              <button>...</button>
            </div>
            <button className="emoji-add-btn">추가</button>
          </div>
        </div>
      </section>

      {/* 구경해보기 버튼 */}
      <section className="explore-section">
        <Link to="/list" className="explore-button">
          구경해보기
        </Link>
      </section>
    </main>
  );
}

export default Home;
