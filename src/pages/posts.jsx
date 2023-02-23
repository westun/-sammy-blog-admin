import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postServices";
import Spinner from "../components/common/spinner";
import Card from "../components/common/card";
import { formatDate } from "../util/dateFormater";
import Search from "../components/common/searchBox";
import Modal from "react-modal";
import modalStyles from "../util/modalStyles";
import Pagination from "../components/common/pagination";
import { paginate } from "./../util/paginate";

Modal.setAppElement("#root");

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        <Search onChange={handleSearch} />
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
                  onClick={() => handleRemoveConfirm(post)}
                >
                  Remove
                </button>
              </p>
            </Card>
          </div>
        ))}
      </div>
      <Pagination
        itemCount={posts.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageClick={handlePageClick}
      />
      <Modal isOpen={isModalOpen} style={modalStyles}>
        <h2>Are you sure?</h2>
        <div className="mb-3">Are you sure you want to remove this post?</div>
        <p className="float-end">
          <button className="btn btn-primary me-2" onClick={handleRemove}>
            Ok
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </p>
      </Modal>
    </div>
  );
}
