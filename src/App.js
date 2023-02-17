import React from "react";
import { NavBar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import Posts from "./pages/posts";
import Comments from "./pages/comments";
import "./App.css";
import Footer from "./components/footer";
import PostEdit from "./pages/postEdit";
import NotFound from "./pages/notfound";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/posts/:id" element={<PostEdit />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
