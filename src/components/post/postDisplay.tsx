import PostHeader from "./postHeader";
import PostBody from "./postBody";
import { Post } from "./types";

interface Props {
  post: Post;
}

export default function PostDisplay({ post }: Props) {
  return (
    <div>
      <PostHeader post={post} />
      <hr />
      <PostBody content={post.content} />
    </div>
  );
}
