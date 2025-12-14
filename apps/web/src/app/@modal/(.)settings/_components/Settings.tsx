import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { createContext, useContext, useState } from "react";

interface SettingsContentContextProps {
  updated: boolean;
  onUpdate: () => void;
  onClearUpdate: () => void;
}

const SettingsContentContext = createContext<
  SettingsContentContextProps | undefined
>(undefined);

export function useSettingsContentContext() {
  const context = useContext(SettingsContentContext);
  if (!context) {
    throw new Error(
      "SettingsContent subcomponents must be used within <SettingsContent>",
    );
  }

  return context;
}

interface SettingsProps {
  children?: React.ReactNode;
}

export function Settings({ children }: SettingsProps) {
  const [updated, setUpdated] = useState(false);

  return (
    <SettingsContentContext.Provider
      value={{
        updated,
        onUpdate: () => {
          setUpdated(true);
        },
        onClearUpdate: () => {
          setUpdated(false);
        },
      }}
    >
      {children}
    </SettingsContentContext.Provider>
  );
}

interface SettingsContentProps {
  children?: React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
}

export function SettingsContent({
  children,
  onSave,
  onCancel,
}: SettingsContentProps) {
  const t = useTranslations("components.modal.settings");
  const { updated, onClearUpdate } = useSettingsContentContext();

  return (
    <div className="h-full flex flex-col pb-5">
      <ScrollArea className="flex-1 overflow-y-hidden">{children}</ScrollArea>

      {updated && (
        <div className="flex gap-2 self-end">
          <Button
            variant="outline"
            onClick={() => {
              onCancel();
              onClearUpdate();
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              onSave();
            }}
          >
            {t("save")}
          </Button>
        </div>
      )}
    </div>
  );
}
