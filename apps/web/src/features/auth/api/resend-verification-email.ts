import server from "@/lib/server";

export function resendVerificationEmail() {
  return server.post<void>("verify-email/resend");
}
