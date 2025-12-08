import { getQueryClient } from "@/lib/query";
import server from "@/lib/server";
import { useMutation } from "@tanstack/react-query";

interface CreateBoardRequest {
  icon: string;
  title: string;
  description: string;
}

export function createBoard(request: CreateBoardRequest) {
  return server.post<void>("boards", {
    json: request,
  });
}

export function useCreateBoardMutation() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
  });
}
