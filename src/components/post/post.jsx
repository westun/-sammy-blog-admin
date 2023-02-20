import React from "react";
import PostHeader from "./postHeader";
import PostBody from "./postBody";

export default function Post({ post }) {
  return (
    <div>
      <PostHeader post={post} />
      <hr />
      <PostBody content={post.content} />
    </div>
  );
}
