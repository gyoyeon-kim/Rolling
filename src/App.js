import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import List from './pages/List';
import From from './pages/From';
import To from './pagwe';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 상단 네비게이션 */}
        <Navigation />

        {/* 라우트 영역 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/list" element={<List />} />
          <Route path="/From" element={<From />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
