import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Post_HS from "./pages/postHS";
import From from "./pages/From";
import Home from "./pages/Home";
import ListPageBH from "./pages/ListPageBH";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPageBH />} />
        <Route path="/post/123" element={<Post_HS />} />
        <Route path="/post/message" element={<From />} />
      </Routes>
    </Router>
  );
}

export default App;
