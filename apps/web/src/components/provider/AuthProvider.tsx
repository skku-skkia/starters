"use client";

import { useSession } from "@/lib/auth";
import { Role } from "@/types/user";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface AuthProviderProps {
  render?: React.ReactNode;
  children: React.ReactNode;
  isProtected?: boolean;
  isAdminOnly?: boolean;
  isOnboarding?: boolean;
}

export default function AuthProvider({
  render,
  children,
  isProtected = false,
  isAdminOnly = false,
  isOnboarding = false,
}: AuthProviderProps) {
  const { data: user, isPending } = useSession();

  const shouldRedirectToLogin = !isPending && isProtected && !user;

  const shouldRedirectToOnboarding =
    !isPending && !isOnboarding && user?.isOnboarded === false;

  const shouldRedirectToApp =
    (!isPending && isAdminOnly && user?.role !== Role.ADMIN) ||
    (!isPending && isOnboarding && user?.isOnboarded === true);

  useEffect(() => {
    if (shouldRedirectToLogin) {
      redirect("/login");
    } else if (shouldRedirectToOnboarding) {
      redirect("/onboarding");
    } else if (shouldRedirectToApp) {
      redirect("/app");
    }
  }, [shouldRedirectToLogin, shouldRedirectToOnboarding, shouldRedirectToApp]);

  if (
    isPending ||
    shouldRedirectToLogin ||
    shouldRedirectToOnboarding ||
    shouldRedirectToApp
  ) {
    return (
      <div className="fixed inset-0 min-h-dvh flex items-center justify-center z-50">
        {render}
      </div>
    );
  }

  return <>{children}</>;
}
