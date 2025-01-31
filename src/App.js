import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Post_HS from "./pages/postHS";
import From from "./pages/From";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/post/123" element={<Post_HS />} />
        <Route path="/post/message" element={<From />} />
      </Routes>
    </Router>
  );
}

export default App;
