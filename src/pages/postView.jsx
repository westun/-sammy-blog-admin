import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/postServices";
import Post from "../components/post/post";

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

  return <Post post={post} />;
}
