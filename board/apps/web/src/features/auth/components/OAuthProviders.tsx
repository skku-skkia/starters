"use client";

import { Button } from "@/components/ui/button";
import { Icon, OAuthIcons } from "@/components/ui/icon";
import env from "@/lib/env";
import { redirect } from "next/navigation";

const providers: {
  id: string;
  name: string;
  icon: OAuthIcons;
}[] = [
  {
    id: "google",
    name: "Google",
    icon: "google",
  },
  {
    id: "naver",
    name: "Naver",
    icon: "naver",
  },
];

export default function OAuthProviders() {
  return (
    <div className="flex gap-4 w-full justify-center items-center">
      {providers.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          size="icon"
          onClick={() => {
            redirect(
              `${env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/${provider.id}`,
            );
          }}
        >
          <Icon icon={provider.icon} />
        </Button>
      ))}
    </div>
  );
}
