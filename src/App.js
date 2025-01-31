import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Post_HS from "./pages/postHS";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Post_HS />} />
        {/*다른 페이지를 추가하시면 됩니다.*/}
      </Routes>
    </Router>
  );
}

export default App;
