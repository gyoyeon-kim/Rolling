import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/HomeBH":
import ListPageBH from "./pages/ListPageBH":
import PostPageBH from "./pages/PostPageBH":
import PostpageBH from "./pages/PostPageBH":
import Post_HS from "./pages/postHS":
import From from "./pages/From":

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPageBH />} />
        <Route path="/post" element={<PostPageBH />} />  
        <Route path="/post/:id" element={<PostPageBH />} {}/>
        <Route path="/post/123" element={<Post_HS />} />
        <Route path="/post/message" element={<From />} />
      </Routes>
    </Router>
  );
}
