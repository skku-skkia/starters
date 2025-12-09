import server, { url } from "@/lib/server";
import { Post } from "@/types/board";
import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

interface GetPostsParams {
  boardId?: number;
  size: number;
  page: number;
  query?: string;
}

interface GetPostsResponse {
  content: Post[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

function getPosts(params?: GetPostsParams) {
  return server
    .get<GetPostsResponse>(
      url("posts", {
        ...params,
      }),
    )
    .json();
}

export function usePosts(
  { boardId, size, page }: GetPostsParams,
  options?: Partial<UseQueryOptions<GetPostsResponse>>,
) {
  return useQuery({
    queryKey: ["posts", boardId, size, page],
    queryFn: () => getPosts({ boardId, size, page }),
    placeholderData: keepPreviousData,
    ...options,
  });
}
