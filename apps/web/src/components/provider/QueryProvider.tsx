"use client";

import { getQueryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryProviderProps {
  children?: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const client = getQueryClient();
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
