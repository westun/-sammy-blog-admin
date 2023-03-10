import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Author from "../components/author/author";
import AuthorRemoveModal from "../components/author/authorRemoveModal";
import { getAuthors, deleteAuthor } from "../services/authorService";
import modalStyles from "../util/modalStyles";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState();

  useEffect(() => {
    async function LoadAuthors() {
      const { data: authorData } = await getAuthors();
      setAuthors(authorData);
    }

    LoadAuthors();
  }, []);

  function handleRemoveModalOpen(author) {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  }

  async function handleRemoveAuthor() {
    setIsModalOpen(false);
    await deleteAuthor(selectedAuthor.id);
    const newAuthors = authors.filter((a) => a.id !== selectedAuthor.id);
    setAuthors(newAuthors);
    toast.success("Author removed successfully", { theme: "colored" });
    setSelectedAuthor(null);
  }

  return (
    <>
      <h1>Authors</h1>
      <div>
        <Link to="/authors/new" className="btn btn-primary">
          Create New Author
        </Link>
      </div>

      {authors.map((author) => (
        <div key={author.id}>
          <Link to={`/authors/${author.id}`}>
            <Author author={author} />
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleRemoveModalOpen(author)}
          >
            Remove
          </button>
          <hr className="my-0" />
        </div>
      ))}
      <AuthorRemoveModal
        isModalOpen={isModalOpen}
        onRemoveAuthor={handleRemoveAuthor}
        onCloseModal={() => setIsModalOpen(false)}
        modalStyles={modalStyles}
      />
    </>
  );
}
