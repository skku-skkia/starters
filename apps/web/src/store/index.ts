import { StateCreator } from "zustand";

export function ssr<T>(
  config: StateCreator<T>,
  isSSR: boolean = typeof window === "undefined",
): StateCreator<T> {
  return (set, get, api) => {
    if (!isSSR) {
      return config(set, get, api);
    }

    const ssrSet = () => {
      throw new Error("Cannot set state of Zustand store in SSR");
    };

    api.setState = ssrSet;
    return config(ssrSet, get, api);
  };
}
