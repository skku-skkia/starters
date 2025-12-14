"use client";

import { Icon, Icons } from "@/components/ui/icon";
import { Modal, ModalContent, ModalHeader } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountSettings from "./_components/AccountSettings";
import GeneralSettings from "./_components/GeneralSettings";
import { Settings } from "./_components/Settings";

const categories: {
  id: string;
  icon: Icons;
  label: string;
  content: React.ReactNode;
}[] = [
  {
    id: "1",
    icon: "user",
    label: "account",
    content: <AccountSettings />,
  },
  {
    id: "2",
    icon: "settings",
    label: "general",
    content: <GeneralSettings />,
  },
];

export default function SettingsModal() {
  const router = useRouter();
  const t = useTranslations("components.modal.settings");

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    categories[0]?.id,
  );

  return (
    <Modal
      open={true}
      onClose={() => {
        router.back();
      }}
      width="900px"
      maxWidth="90vw"
      height="1000px"
      maxHeight="90vh"
    >
      <ModalHeader>{t("title")}</ModalHeader>

      <ModalContent className="flex gap-4 h-full">
        <div className="grow-1">
          {categories.map((category) => (
            <div
              key={category.id}
              className={cn(
                "flex items-center gap-2 p-2 my-1 rounded-lg cursor-pointer hover:bg-accent",
                selectedCategory === category.id && "bg-accent",
              )}
              onClick={() => {
                setSelectedCategory(category.id);
              }}
            >
              <Icon icon={category.icon} />
              <span>{t(`categories.${category.label}.title`)}</span>
            </div>
          ))}
        </div>

        <div className="grow-5">
          <Settings>
            {
              categories.find((category) => category.id === selectedCategory)
                ?.content
            }
          </Settings>
        </div>
      </ModalContent>
    </Modal>
  );
}
