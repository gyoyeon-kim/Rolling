import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home_BH";
import ListPage_BH from "./pages/ListPage_BH";
import PostPage_BH from "./pages/PostPage_BH";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage_BH />} />
        <Route path="/post" element={<PostPage_BH />} />
        <Route path="/post/:id" element={<PostPage_BH />} /> {/* 동적 경로 */}
      </Routes>
    </Router>
  );
}

export default App;
