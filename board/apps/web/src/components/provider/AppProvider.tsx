import { NextIntlClientProvider } from "next-intl";

interface AppProviderProps {
  children?: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
