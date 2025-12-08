import server from "@/lib/server";
import { AuthenticatedUser } from "@/types/user";

export function getViewer() {
  return server.get<AuthenticatedUser>("users/me").json();
}
