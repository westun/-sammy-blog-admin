import profileIcon from "../../assets/images/iconprof.png";
import { Author } from "./types";

interface Props {
  author: Author;
}

export default function AuthorDisplay({ author }: Props) {
  return (
    <>
      <div className="card-body p-4">
        <div className="d-flex flex-start">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src={author.imageUrl || profileIcon}
            alt="avatar"
            width="80"
            height="80"
          />
          <div>
            <h6 className="fw-bold mb-1">
              {author.firstName} {author.lastName}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
