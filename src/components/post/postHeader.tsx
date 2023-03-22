import React from "react";
import { formatDate } from "../../util/dateFormater";
import { Post } from "./types";

interface Props {
  post: Post;
}

export default function PostHeader({ post }: Props) {
  return (
    <React.Fragment>
      <h1>{post.title}</h1>
      <div>
        Written by: {post.author?.firstName} {post.author?.lastName} {" | "}{" "}
        {formatDate(post.dateCreated)}
      </div>
    </React.Fragment>
  );
}
