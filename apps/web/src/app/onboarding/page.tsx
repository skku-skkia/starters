import AuthProvider from "@/components/provider/AuthProvider";
import EmailVerification from "./_components/EmailVerification";

export default function Onboarding() {
  return (
    <AuthProvider isProtected isOnboarding>
      <div className="flex min-h-screen items-center justify-center">
        <EmailVerification />
      </div>
    </AuthProvider>
  );
}
