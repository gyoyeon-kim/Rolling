import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 전체 애플리케이션 적용 css
import App from './App';
import reportWebVitals from './etc/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(); // 웹 성능 측정 함수
