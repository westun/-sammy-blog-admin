import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postServices";
import moment from "moment/moment";
import Spinner from "../components/common/spinner";

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

  function formatedDate(date) {
    return moment(date).format("MMMM Do YYYY");
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
          <div key={post.id} className="col-4 mb-3">
            <div className="card">
              <img src={post.imageUrl} className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <p>{formatedDate(post.date)}</p>
                <p>
                  <Link to={`/posts/${post.id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <Link
                    to={`/posts/view/${post.id}`}
                    className="btn btn-primary ms-3"
                  >
                    View
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
