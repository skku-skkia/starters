import { NextIntlClientProvider } from "next-intl";
import QueryProvider from "./QueryProvider";

interface AppProviderProps {
  children?: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <NextIntlClientProvider>
      <QueryProvider>{children}</QueryProvider>
    </NextIntlClientProvider>
  );
}
