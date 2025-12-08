import { DefaultOptions, QueryClient, isServer } from "@tanstack/react-query";

const config: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 1000,
    throwOnError: true,
  },
};

function createQueryClient() {
  return new QueryClient({
    defaultOptions: config,
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return createQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
}

export { getQueryClient };
