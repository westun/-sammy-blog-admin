import React from "react";
import Card from "../common/card";
import { formatDate } from "../../util/dateFormater";
import { Link } from "react-router-dom";

export default function PostCard({ post, onRemovePost }) {
  return (
    <Card
      imageUrl={post.imageUrl}
      title={post.title}
      description={post.description}
    >
      <p>{formatDate(post.dateCreated)}</p>
      <p>
        <Link to={`/posts/${post.id}`} className="btn btn-primary">
          Edit
        </Link>
        <Link to={`/posts/view/${post.id}`} className="btn btn-primary ms-2">
          View
        </Link>
        <button
          className="btn btn-danger ms-2"
          onClick={() => onRemovePost(post)}
        >
          Remove
        </button>
      </p>
    </Card>
  );
}
