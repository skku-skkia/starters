"use client";

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function SettingsModal() {
  const router = useRouter();
  const t = useTranslations("components.modal.settings");

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
      <ModalCloseButton />
      <ModalHeader>{t("title")}</ModalHeader>
      <ModalContent></ModalContent>
    </Modal>
  );
}
