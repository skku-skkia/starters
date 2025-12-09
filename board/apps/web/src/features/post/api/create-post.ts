import server from "@/lib/server";
import { useMutation } from "@tanstack/react-query";

interface CreatePostRequest {
  title: string;
  content: string;
  boardId: number;
  isPublic: boolean;
  isCommentingAllowed: boolean;
}

export function createPost(request: CreatePostRequest) {
  return server.post<void>("posts", {
    json: request,
  });
}

export function useCreatePostMutation() {
  return useMutation({
    mutationFn: createPost,
  });
}
