import server from "@/lib/server";
import { AuthenticatedUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function getViewer() {
  return server.get<AuthenticatedUser>("users/me").json();
}

export function useViewer() {
  return useQuery({
    queryKey: ["viewer"],
    queryFn: getViewer,
  });
}
