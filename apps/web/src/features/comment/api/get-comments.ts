import server from "@/lib/server";
import { Comment } from "@/types/board";
import { useQuery } from "@tanstack/react-query";

interface GetCommentsParams {
  postId: string;
}

export function getComments({ postId }: GetCommentsParams) {
  return server.get<Comment[]>(`posts/${postId}/comments`).json();
}

export function useComments({ postId }: GetCommentsParams) {
  return useQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => getComments({ postId }),
  });
}
