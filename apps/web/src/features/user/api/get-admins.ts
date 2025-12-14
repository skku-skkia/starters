import server from "@/lib/server";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export async function getAdmins() {
  return server.get<User[]>("users/admins").json();
}

export function useAdmins() {
  return useQuery({
    queryKey: ["users", "admins"],
    queryFn: getAdmins,
  });
}
