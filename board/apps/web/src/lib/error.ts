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

export function handleAppError(
  error: Error,
  handlers?: Partial<Record<ErrorCode, () => void>>,
) {
  if (error instanceof AppError) {
    const handler = handlers?.[error.code];
    if (handler) {
      handler();
      return;
    }
  }

  throw error;
}
