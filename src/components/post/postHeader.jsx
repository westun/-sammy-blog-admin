import React from "react";
import { formatDate } from "../../util/dateFormater";

export default function PostHeader({ post }) {
  return (
    <React.Fragment>
      <h1>{post.title}</h1>
      <div>
        Written by: {post.author} {" | "} {formatDate(post.dateCreated)}
      </div>
    </React.Fragment>
  );
}
