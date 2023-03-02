import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/postServices";
import Post from "../components/post/post";
import { getComments } from "../services/commentService";
import Comments from "../components/comment/comments";
import Spinner from "../components/common/spinner";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: postData } = await getPost(id);
      setPost(postData);
      setIsPostsLoading(false);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const { data: commentsData } = await getComments(id);
      setComments(commentsData);
      setIsCommentsLoading(false);
    }

    loadData();
  }, []);

  if (isPostsLoading) {
    return <Spinner />;
  }

  return (
    <div className="row">
      <div className="col-8">
        <Post post={post} />
        <hr />
        {isCommentsLoading ? <Spinner /> : <Comments comments={comments} />}
      </div>
      <div className="col-4">{/* side bar */}</div>
    </div>
  );
}
