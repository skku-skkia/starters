import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  client: {
    NEXT_PUBLIC_BACKEND_URL: z.string().nonempty(),
    NEXT_PUBLIC_WEBSOCKET_URL: z.string().nonempty(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
  },
});

export default env;
