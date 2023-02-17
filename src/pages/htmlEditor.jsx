import React, { useEffect, useState } from "react";
import { Jodit } from "jodit";
import { useRef } from "react";
import { getPost, updatePost } from "../../services/postServices";
import "jodit/build/jodit.min.css";

export default function HtmlEditor() {
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const editor = Jodit.make(inputRef.current);

    async function loadPost() {
      const { data } = await getPost(1);
      setPost(data);
      editor.value = data.content;
      inputRef.current.value = data.content;
      setTitle(data.title);
    }

    loadPost();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     setIsSaving(true);

  //     console.log(post);
  //     await handleSave();
  //     console.log("set interval save called");
  //     setIsSaving(false);
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  function handlePreview() {
    setHtml(inputRef.current.value);
  }

  async function handleSave() {
    const htmlContent = inputRef.current.value;

    const postData = {
      id: post.id,
      title,
      content: htmlContent,
    };

    console.log(postData);

    await updatePost(postData);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  return (
    <div>
      <div className="form-inline my-3">
        <label className="mr-2">
          <strong>Title:</strong>
        </label>{" "}
        <input
          value={title}
          className="form-control"
          onChange={handleTitleChange}
        />
      </div>
      <textarea id="editor" name="editor" ref={inputRef}></textarea>
      <p className="mt-3">
        <button className="btn btn-primary" onClick={handlePreview}>
          Preview
        </button>
        <button className="btn btn-primary ml-2" onClick={handleSave}>
          Save
        </button>
      </p>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}
