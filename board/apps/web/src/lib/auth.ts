import { getViewer } from "@/features/user/api/get-viewer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorCode, handleAppError } from "@/lib/error";
import { getQueryClient } from "./query";
import { login } from "@/features/auth/api/login";

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () =>
      getViewer().catch((error) =>
        handleAppError(error, {
          [ErrorCode.UNAUTHORIZED]: () => null,
        }),
      ),
  });
};

export const useLogin = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
