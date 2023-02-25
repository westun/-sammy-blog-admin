import React, { useEffect, useState } from "react";
import { Jodit } from "jodit";
import { useRef } from "react";
import { getPost, updatePost, addPost } from "../services/postServices";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/input";
import Post from "../components/post/post";
import Joi from "joi";
import { toast } from "react-toastify";
import "jodit/build/jodit.min.css";

export default function PostEdit() {
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [ispreviewing, setIsPreviewing] = useState(false);
  const inputRef = useRef(null);
  const { id: postIdParam } = useParams();
  const navigate = useNavigate();

  const schema = {
    title: Joi.string().required().label("title"),
    description: Joi.string().required().label("Description"),
    author: Joi.string().required().label("Author"),
    imageUrl: Joi.string().label("Cover Url"),
  };

  const schemaObj = Joi.object(schema);

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
    const { error } = schemaObj.validate(
      { title, description, author, imageUrl },
      { abortEarly: false }
    );

    setErrors({});

    if (!error) {
      return await doSubmit();
    }

    toast.error("Some required fields are missing, post did NOT save.", {
      theme: "colored",
    });

    const errorsObj = {};
    for (let item of error.details) {
      errorsObj[item.path[0]] = item.message;
    }
    setErrors(errorsObj);
  }

  async function doSubmit() {
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

    setIsSaving(true);

    if (postData.id) {
      await updatePost(postData);
      setIsSaving(false);
      showSuccessSavingToast();
      return;
    }

    const { data } = await addPost(postData);
    setPost(data);
    setIsSaving(false);
    showSuccessSavingToast();
    navigate(`/posts/${data.id}`);
  }

  function showSuccessSavingToast() {
    toast.success("Post saved successfully.", {
      theme: "colored",
    });
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
      <Input
        label="Title"
        value={title}
        name="title"
        error={errors["title"]}
        onChange={handleTitleChange}
      />
      <Input
        label="Description"
        value={description}
        name="description"
        error={errors["description"]}
        onChange={handleDescriptionChange}
      />
      <Input
        label="Author"
        value={author}
        name="author"
        error={errors["author"]}
        onChange={handleAuthorChange}
      />
      <Input
        label="Cover Url"
        value={imageUrl}
        name="imageUrl"
        error={errors["imageUrl"]}
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
