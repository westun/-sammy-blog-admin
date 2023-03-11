import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import { Home } from "./pages/home";
import Posts from "./pages/posts";
import Comments from "./pages/comments";
import NavBar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import PostEdit from "./pages/postEdit";
import NotFound from "./pages/notfound";
import Login from "./pages/login";
import PostView from "./pages/postView";
import Logout from "./pages/logout";
import Authors from "./pages/authors";
import AuthorEdit from "./pages/authorEdit";
import ProtectedRoute from "./components/routing/protectedRoute";
import { isAuthenticated } from "./services/authService";
import SessionExpiringModal from "./components/auth/sessionExpiringModal";
import ImageUpload from "./pages/imageUpload";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

Modal.setAppElement("#root");

function App() {
  //this exists to rerender the App component each time the location changes
  // which one use is for hiding/showing the navbar
  const location = useLocation();

  return (
    <React.Fragment>
      <SessionExpiringModal />
      <ToastContainer />
      {<NavBar show={isAuthenticated()} />}
      <div className="container">
        <Routes>
          <Route
            path="/posts/view/:id"
            element={
              <ProtectedRoute>
                <PostView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/imageupload"
            element={
              <ProtectedRoute>
                <ImageUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comments"
            element={
              <ProtectedRoute>
                <Comments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/authors"
            element={
              <ProtectedRoute>
                <Authors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/authors/:id"
            element={
              <ProtectedRoute>
                <AuthorEdit />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/"
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
