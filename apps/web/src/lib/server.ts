import logger from "./logger";
import ky, { HTTPError } from "ky";
import env from "./env";
import AppError, { ErrorCode } from "./error";

export function isBrowser() {
  return typeof window !== "undefined";
}

export function url(
  base: string,
  params?: Record<string, string | number | boolean | undefined | null>,
): string {
  const filteredParams =
    params &&
    Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== null,
      ),
    );

  const queryString = new URLSearchParams(
    Object.entries(filteredParams || {}).reduce(
      (params: Record<string, string>, [key, value]) => {
        if (value !== undefined && value !== null) {
          params[key] = String(value);
        }
        return params;
      },
      {},
    ),
  ).toString();

  return `${base}?${queryString}`;
}

export async function getServerCookies() {
  return import("next/headers").then(async ({ cookies }) => {
    try {
      const cookieStore = await cookies();
      return cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
    } catch (error) {
      logger.error("Failed to access cookies: " + error);
      return "";
    }
  });
}

const server = ky.create({
  prefixUrl: env.NEXT_PUBLIC_BACKEND_URL,
  credentials: "include",
  retry: {
    limit: 3,
    shouldRetry: ({ error, retryCount }) => {
      if (error instanceof AppError) {
        logger.debug("Received AppError, will not retry.");
        return false;
      }

      logger.debug(`Retry attempt #${retryCount}`);
      return retryCount < 3;
    },
  },
  hooks: {
    beforeRequest: [
      (request) => {
        logger.debug(`Request: ${request.method} ${request.url}`);
      },
      async (request) => {
        if (!isBrowser()) {
          try {
            const cookies = await getServerCookies();
            if (cookies) {
              request.headers.set("Cookie", cookies);
            }
          } catch (error) {
            logger.error("Failed to set cookies: " + error);
          }
        }
      },
    ],
    afterResponse: [
      (request, _, response) => {
        logger.debug(
          `Response: ${request.method} ${request.url} - ${response.status}`,
        );
      },
    ],
    beforeError: [
      (error) => {
        logger.debug(`Error: ${error.message}`);

        if (error instanceof HTTPError) {
          const {
            response: { status },
          } = error;

          if (status === 401) {
            logger.debug("Unauthorized error detected, throwing AppError.");
            throw new AppError(ErrorCode.UNAUTHORIZED);
          }

          // TODO: Need to handle other custom errors from backend
        }

        return error;
      },
    ],
  },
});
export default server;
