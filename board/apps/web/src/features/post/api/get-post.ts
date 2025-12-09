import server from "@/lib/server";
import { Post } from "@/types/board";
import { useQuery } from "@tanstack/react-query";

interface GetPostParams {
  id: string;
}

export function getPost({ id }: GetPostParams) {
  return server.get<Post>(`posts/${id}`).json();
}

export function usePost({ id }: GetPostParams) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost({ id }),
  });
}
