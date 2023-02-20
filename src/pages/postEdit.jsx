import React, { useEffect, useState } from "react";
import { Jodit } from "jodit";
import { useRef } from "react";
import { getPost, updatePost, addPost } from "../services/postServices";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/input";
import moment from "moment";
import "jodit/build/jodit.min.css";
import Post from "../components/post/post";

export default function PostEdit() {
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [ispreviewing, setIsPreviewing] = useState(false);
  const inputRef = useRef(null);
  const { id: postIdParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const editor = Jodit.make(inputRef.current);

    if (postIdParam === "new") {
      return;
    }

    async function loadPost() {
      const { data } = await getPost(postIdParam);
      setPost(data);
      editor.value = data.content;
      inputRef.current.value = data.content;
      setTitle(data.title);
      setDescription(data.description);
      setAuthor(data.author);
      setImageUrl(data.imageUrl);
    }

    loadPost();
  }, []);

  function handlePreview() {
    setHtml(inputRef.current.value);
    setIsPreviewing(true);
  }

  async function handleSave() {
    const htmlContent = inputRef.current.value;

    const postData = {
      id: post.id,
      title,
      description,
      author,
      imageUrl,
      date: post.date ? post.date : new Date().toString(),
      content: htmlContent,
    };

    console.log(postData);

    setIsSaving(true);

    if (postData.id) {
      console.log("update post method executing");
      await updatePost(postData);
      setIsSaving(false);
      return;
    }

    console.log("Add post method executing");
    const { data } = await addPost(postData);
    setPost(data);
    setIsSaving(false);
    navigate(`/posts/${data.id}`);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }

  function handleImageUrlChange(e) {
    setImageUrl(e.target.value);
  }

  return (
    <div>
      <Input value={title} label="Title" onChange={handleTitleChange} />
      <Input
        value={description}
        label="Description"
        onChange={handleDescriptionChange}
      />
      <Input value={author} label="Author" onChange={handleAuthorChange} />
      <Input
        value={imageUrl}
        label="Cover Url"
        onChange={handleImageUrlChange}
      />
      <textarea id="editor" name="editor" ref={inputRef}></textarea>
      <p className="mt-3">
        <button className="btn btn-primary" onClick={handlePreview}>
          Preview
        </button>
        <button
          className="btn btn-primary ms-2"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Please wait..." : "Save"}
        </button>
      </p>

      {ispreviewing && (
        <Post post={{ title, author, date: post.date, content: html }} />
      )}
    </div>
  );
}
