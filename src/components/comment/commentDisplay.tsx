import React from "react";
import { formatDate } from "../../util/dateFormater";
import profileIcon from "../../assets/images/iconprof.png";
import { Comment } from "./types";

interface Props {
  comment: Comment;
}

export default function CommentDisplay({ comment }: Props) {
  function getUsername() {
    if (comment.user && comment.user.firstName && comment.user.lastName) {
      return comment.user.firstName + " " + comment.user.lastName;
    }

    return "Anonymous";
  }

  return (
    <React.Fragment>
      <div className="card-body p-4">
        <div className="d-flex flex-start">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src={profileIcon}
            alt="avatar"
            width="60"
            height="60"
          />
          <div>
            <h6 className="fw-bold mb-1">{getUsername()}</h6>
            <div className="d-flex align-items-center mb-3">
              <p className="mb-0">{formatDate(comment.dateCreated)}</p>
            </div>
            <p className="mb-0">{comment.content}</p>
          </div>
        </div>
      </div>
      <hr className="my-0" />
    </React.Fragment>
  );
}
