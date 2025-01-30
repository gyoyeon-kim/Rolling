import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Route path="/post/:id" element={<PostPageBH />} /> {/* 동적 경로 */}
      </Routes>
    </Router>
  );
}

export default App;
