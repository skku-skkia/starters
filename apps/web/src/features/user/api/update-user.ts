import { getQueryClient } from "@/lib/query";
import server from "@/lib/server";
import { useMutation } from "@tanstack/react-query";

interface UpdateUserRequest {
  username?: string;
  isOnboarded?: boolean;
}

export function updateUser(request: UpdateUserRequest) {
  return server.patch("users/me", {
    json: request,
  });
}

export function useUpdateUserMutation() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viewer"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}
