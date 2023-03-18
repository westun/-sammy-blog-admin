import React from "react";

interface Props {
  content: string;
}

export default function PostBody({ content }: Props) {
  return (
    <div className="mt-3" dangerouslySetInnerHTML={{ __html: content }}></div>
  );
}
