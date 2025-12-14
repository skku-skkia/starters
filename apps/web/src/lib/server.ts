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
    filteredParams as Record<string, string>,
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
        return false;
      }

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
          await getServerCookies().then((cookies) => {
            if (cookies) {
              request.headers.set("Cookie", cookies);
            }
          });
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
        logger.error(`Error: ${error.message}`);

        if (error instanceof HTTPError) {
          const {
            response: { status },
          } = error;

          if (status === 401) {
            throw new AppError(ErrorCode.UNAUTHORIZED);
          }
        }

        return error;
      },
    ],
  },
});
export default server;
