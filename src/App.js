import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import Post_HS from "./pages/postHS";
import From from "./pages/From";
import Home from "./pages/Home";
import ListPageBH from "./pages/ListPageBH";
import ToPageKM from "./pages/ToPageKM";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 홈 페이지 */}
        <Route path="/list" element={<ListPageBH />} /> {/* 리스트 페이지 */}
        <Route path="/post/:id" element={<Post_HS />} /> {/* 동적 라우팅 */}
        <Route path="/post/message" element={<From />} /> {/* 공통 메시지 */}
        <Route path="/post/:id/message" element={<From />} /> {/* 특정 ID 메시지 */}
        <Route path="/post" element={<ToPageKM />} /> {/* 나도만들기 페이지*/}
      </Routes>
    </Router>
  );
}

export default App;
