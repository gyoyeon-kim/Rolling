import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderBH.css';
import Logo from '../images/LogoBH.svg'; // 로고 파일 경로

function HeaderBH() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => navigate('/')}>
          <img src={Logo} alt="Rolling Logo" className="logo-image" />
          <h1 className="logo-text">Rolling</h1>
        </div>
        <button
          className="create-paper-button"
          onClick={() => navigate('/post')}
        >
          롤링 페이퍼 만들기
        </button>
      </div>
    </header>
  );
}

export default HeaderBH;
