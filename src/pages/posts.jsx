import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postServices";
import Spinner from "../components/common/spinner";
import SearchBox from "../components/common/searchBox";
import Pagination from "../components/common/pagination";
import { paginate } from "./../util/paginate";
import PostCard from "../components/post/postCard";
import ConfirmModal from "../components/common/modal";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

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

  function handleRemoveConfirm(post) {
    setSelectedPost(post);
    setIsModalOpen(true);
  }

  async function handleRemove() {
    const postId = selectedPost.id;
    await postService.deletePost(postId);
    setPosts((oldPosts) => oldPosts.filter((p) => p.id !== postId));
    setIsModalOpen(false);
  }

  function handleSearch(searchQuery) {
    setSearchQuery(searchQuery);
  }

  function handlePageClick(page) {
    setCurrentPage(page);
  }

  function getPosts() {
    let filteredPosts = posts;
    if (searchQuery) {
      filteredPosts = posts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filteredPosts = paginate(filteredPosts, pageSize, currentPage);

    return filteredPosts;
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
      <div className="mb-3">
        <SearchBox onChange={handleSearch} />
      </div>
      <Pagination
        itemCount={posts.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageClick={handlePageClick}
      />
      <div className="row">
        {getPosts().map((post) => (
          <div key={post.id} className="col-lg-4 col-md-6 mb-3">
            <PostCard post={post} onRemovePost={handleRemoveConfirm} />
          </div>
        ))}
      </div>
      <Pagination
        itemCount={posts.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageClick={handlePageClick}
      />
      <ConfirmModal
        isModalOpen={isModalOpen}
        header="Are you sure?"
        body={`Are you sure you want to remove the post: ${selectedPost.title}`}
        onClickCancel={() => setIsModalOpen(false)}
        onClickOk={handleRemove}
      />
    </div>
  );
}
