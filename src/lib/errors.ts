import { createServerResult, RESULT_TYPE } from "@/lib";

import type { ServerResult } from "@/lib";

export const API_URL_ERROR = {
  MALFORMED_PATH: "URL path not properly formed.",
} as const;

export const PASSWORD_VALIDATION_ERROR = {
  INVALID_CONFIRMATION: "Password does not match confirmation.",
} as const;

export function handleError(e: unknown): ServerResult {
  const message = e instanceof Error ? e.message : String(e);
  return createServerResult(message, RESULT_TYPE.ERROR);
}
