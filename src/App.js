import React from "react";
import { NavBar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import Post from "./pages/post";
import Comments from "./pages/comments";
import "./App.css";
import Footer from "./components/footer";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
