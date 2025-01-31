import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Post_HS from "./pages/postHS";
import From from "./pages/From";
import Home from "./pages/HomeBH";
import ListPageBH from "./pages/ListPageBH";
import PostPageBH from "./pages/PostPageBH";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPageBH />} />
        <Route path="/post" element={<PostPageBH />} />
        <Route path="/post/:id" element={<PostPageBH />} />
        <Route path="/post/123" element={<Post_HS />} />
        <Route path="/post/message" element={<From />} />
      </Routes>
    </Router>
  );
}

export default App;