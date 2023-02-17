import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postServices";
import moment from "moment/moment";

export default function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const { data: postData } = await postService.getPosts();
      setPosts(postData);
    }

    loadPosts();
  }, []);

  function formatedDate(date) {
    return moment(date, "MM/DD/YYYY").format("MMMM Do YYYY");
  }

  return (
    <div>
      <h1>Posts</h1>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-4">
            <div className="card">
              <img src={post.imgUrl} className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <p>{formatedDate(post.date)}</p>
                <Link to="/posts/:id" className="btn btn-primary">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
