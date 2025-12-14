"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useViewer } from "../api/get-viewer";
import { Icon, Icons } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";
import { Role } from "@/types/user";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProfileDropdownItemProps {
  icon: Icons;
  adminOnly: boolean;
  label: string;
  action?: () => void;
}

export default function ProfileDropdown() {
  const t = useTranslations("components.profile-dropdown");
  const router = useRouter();

  const { data: user, isPending } = useViewer();

  const items: ProfileDropdownItemProps[] = [
    {
      icon: "user-admin",
      adminOnly: true,
      label: t("admin-dashboard"),
      action: () => {
        router.push("/admin");
      },
    },
    {
      icon: "settings",
      adminOnly: false,
      label: t("settings"),
      action: () => {
        router.push("/settings");
      },
    },
    {
      icon: "logout",
      adminOnly: false,
      label: t("logout"),
    },
  ];

  if (isPending) {
    return null;
  }

  if (!user) {
    return (
      <Button>
        <Link href="/auth/login">{t("login")}</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border-1 flex items-center justify-center cursor-pointer">
          <Icon icon="user" />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {items
          .filter((item) => (item.adminOnly ? user.role === Role.ADMIN : true))
          .map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.action}>
              <Icon icon={item.icon} />
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
