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
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPageBH />} />
        <Route path="/post/123" element={<Post_HS />} />
        <Route path="/post/message" element={<From />} />

        <Route path="/post/:id" element={<Post_HS />} />
        <Route path="/post/:id/message" element={<From />} />

        <Route path="/post" element={<ToPageKM />} />
      </Routes>
    </Router>
  );
}

export default App;
