import React from "react";
import moment from "moment";

export default function PostHeader({ post }) {
  function getFormatedDate() {
    return moment(post.dateCreated).format("MMMM Do YYYY");
  }

  return (
    <React.Fragment>
      <h1>{post.title}</h1>
      <div>
        Written by: {post.author} {" | "} {getFormatedDate()}
      </div>
    </React.Fragment>
  );
}
