import React from "react";
import { Link } from "react-router-dom";
import Card from "../common/card";

export default function PostViewSideBar({ posts }) {
  return (
    <div className="sidebar">
      <h2 className="ms-3">More Posts</h2>
      {posts.map((post) => (
        <div className="ms-3 mb-3" key={post.id}>
          <Link
            to={`/posts/view/${post.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              imageUrl={post.imageUrl}
              title={post.title}
              description={post.description}
            ></Card>
          </Link>
        </div>
      ))}
    </div>
  );
}
