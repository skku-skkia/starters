"use client";

import { usePost } from "@/features/post/api/get-post";

interface PostTitleProps {
  id: string;
}

export default function PostTitle({ id }: PostTitleProps) {
  const { data: post } = usePost({ id });

  if (!post) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl">{post.title}</h1>

      <span className="text-sm">{post.authorId}</span>
    </div>
  );
}
