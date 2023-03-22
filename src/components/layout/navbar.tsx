import React from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js"; //imported to fix hamburger menu

interface Props {
  show: boolean;
}

export default function NavBar({ show }: Props) {
  if (!show) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Sammy Blog Admin
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link active" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/posts" className="nav-link">
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/authors" className="nav-link">
                Authors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/comments" className="nav-link">
                Comments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/imageupload" className="nav-link">
                Image Upload
              </NavLink>
            </li>
          </ul>
          <div className="d-flex">
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
