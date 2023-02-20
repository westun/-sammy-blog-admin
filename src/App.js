import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import Posts from "./pages/posts";
import Comments from "./pages/comments";
import NavBar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import PostEdit from "./pages/postEdit";
import NotFound from "./pages/notfound";
import Login from "./pages/login";
import PostView from "./pages/postView";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/posts/view/:id" element={<PostView />} />
          <Route path="/posts/:id" element={<PostEdit />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
