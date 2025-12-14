import server from "@/lib/server";
import { useMutation } from "@tanstack/react-query";

interface VerifyEmailRequest {
  code: string;
}

export async function verifyEmail(request: VerifyEmailRequest) {
  return server.post<void>("verify-email", {
    json: request,
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}
