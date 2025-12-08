import server from "@/lib/server";

interface LoginRequest {
  email: string;
  password: string;
}

export function login(request: LoginRequest) {
  return server.post<void>("auth/login", {
    json: request,
  });
}
