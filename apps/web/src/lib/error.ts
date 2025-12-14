export enum ErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export default class AppError extends Error {
  public readonly code: ErrorCode;

  constructor(code: ErrorCode, message?: string) {
    super(message);
    this.code = code;
  }
}

export function handleAppError<T = never>(
  error: Error,
  handlers?: Partial<Record<ErrorCode, () => T | null>>,
) {
  if (error instanceof AppError) {
    const handler = handlers?.[error.code];
    if (handler) {
      return handler();
    }
  }

  throw error;
}
