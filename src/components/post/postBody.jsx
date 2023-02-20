import React from "react";

export default function PostBody({ content }) {
  return (
    <div className="mt-3" dangerouslySetInnerHTML={{ __html: content }}></div>
  );
}
