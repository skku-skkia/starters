import server from "@/lib/server";

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export function register(request: RegisterRequest) {
  return server.post<void>("auth/register", {
    json: request,
  });
}
