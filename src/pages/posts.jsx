import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postServices";
import moment from "moment/moment";
import Spinner from "../components/common/spinner";
import Card from "../components/common/card";
import { formatDate } from "../util/dateFormater";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function loadPosts() {
      const { data: postData } = await postService.getPosts();
      setPosts(postData);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    loadPosts();
  }, []);

  async function handleRemove(postId) {
    const doDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (doDelete) {
      await postService.deletePost(postId);
      setPosts((oldPosts) => oldPosts.filter((p) => p.id !== postId));
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Posts</h1>
      <div className="mb-3">
        <Link to={`/posts/new`} className="btn btn-primary">
          Create New Post
        </Link>
      </div>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-lg-4 col-md-6 mb-3">
            <Card
              imageUrl={post.imageUrl}
              title={post.title}
              description={post.description}
              styles={{ width: "18rem" }}
            >
              <p>{formatDate(post.date)}</p>
              <p>
                <Link to={`/posts/${post.id}`} className="btn btn-primary">
                  Edit
                </Link>
                <Link
                  to={`/posts/view/${post.id}`}
                  className="btn btn-primary ms-2"
                >
                  View
                </Link>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleRemove(post.id)}
                >
                  Remove
                </button>
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
