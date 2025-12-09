"use client";

import { usePost } from "@/features/post/api/get-post";

interface PostContentProps {
  id: string;
}

export default function PostContent({ id }: PostContentProps) {
  const { data: post } = usePost({ id });

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-[200px]">
      <div>{post.content}</div>
    </div>
  );
}
