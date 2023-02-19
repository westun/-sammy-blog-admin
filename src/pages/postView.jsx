import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/postServices";
import moment from "moment";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function loadPost() {
      const { data: postData } = await getPost(id);
      setPost(postData);
    }

    loadPost();
  }, []);

  function getFormatedDate() {
    return moment(post.dateCreated).format("MMMM Do YYYY");
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        Written by: {post.author} {" | "} {getFormatedDate()}
      </div>
      <hr />
      <div
        className="mt-3"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}
