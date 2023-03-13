import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, getPosts } from "../services/postServices";
import Post from "../components/post/post";
import { getComments } from "../services/commentService";
import Comments from "../components/comment/comments";
import Spinner from "../components/common/spinner";
import PostViewSideBar from "../components/post/postViewSideBar";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: postData } = await getPost(id);
      setPost(postData);
      setIsPostsLoading(false);
    }

    loadData();
  }, [id]);

  useEffect(() => {
    async function loadData() {
      const { data: commentsData } = await getComments(id);
      setComments(commentsData);
      setIsCommentsLoading(false);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const { data: postsData } = await getPosts();
      setPosts(postsData);
    }

    loadData();
  }, []);

  if (isPostsLoading) {
    return <Spinner />;
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <Post post={post} />
        <hr />
        {isCommentsLoading ? <Spinner /> : <Comments comments={comments} />}
      </div>
      <div className="col-md-4">
        <PostViewSideBar posts={posts} />
      </div>
    </div>
  );
}
