import { useViewer } from "@/features/user/api/get-viewer";
import { SettingsContent, useSettingsContentContext } from "./Settings";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useUpdateUserMutation } from "@/features/user/api/update-user";

export default function AccountSettings() {
  const t = useTranslations("components.modal.settings.categories.account");
  const { data: viewer } = useViewer();

  const [userData, setUserData] = useState({
    name: viewer?.username || "",
  });

  const { onUpdate, onClearUpdate } = useSettingsContentContext();

  const { mutate: updateUser } = useUpdateUserMutation();

  useEffect(() => {
    if (viewer) {
    }
  }, [userData, onUpdate, viewer]);

  return (
    <SettingsContent
      onCancel={() => {
        setUserData({ name: viewer?.username || "" });
      }}
      onSave={() => {
        updateUser(
          { username: userData.name },
          {
            onSuccess: () => {
              onClearUpdate();
            },
          },
        );
      }}
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">{t("name")}</h2>
        <Input
          value={userData.name}
          onChange={(e) => {
            setUserData((data) => ({ ...data, name: e.target.value }));

            if (e.target.value !== viewer?.username) {
              onUpdate();
            } else {
              onClearUpdate();
            }
          }}
        />
      </div>
    </SettingsContent>
  );
}
