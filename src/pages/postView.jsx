import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/postServices";
import Post from "../components/post/post";
import { getComments } from "../services/commentService";
import Comments from "../components/comment/comments";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: postData } = await getPost(id);
      setPost(postData);

      //maybe use set timeout to show loading spinner
      //or load data in the component itself, then have an event callback to nofity when it's done
      //...and conditionally render component based on value set from callback
      const { data: commentsData } = await getComments(id);
      setComments(commentsData);
    }

    loadData();
  }, []);

  return (
    <div className="row">
      <div className="col-8">
        <Post post={post} />
        <hr />
        <Comments comments={comments} />
      </div>
      <div className="col-4">{/* side bar */}</div>
    </div>
  );
}
