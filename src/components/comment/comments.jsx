import React from "react";
import Comment from "./comment";

export default function Comments({ comments }) {
  return (
    <div className="container mb-5 py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 col-lg-10">
          <div className="card text-dark">
            <h4 className="mb-0 ps-4 pt-4">Post comments</h4>
            <p className="fw-light mb-4 pb-2 ps-4">Latest Comments by users</p>
            {comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <Comment comment={comment} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
