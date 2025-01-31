import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import From from "./pages/From";
import Home from "./pages/HomeBH";
import ListPageBH from "./pages/ListPageBH";
import PostPageBH from "./pages/PostPageBH";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/post/message" element={<From />} />
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPageBH />} />
        <Route path="/post" element={<PostPageBH />} />
        <Route path="/post/:id" element={<PostPageBH />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
