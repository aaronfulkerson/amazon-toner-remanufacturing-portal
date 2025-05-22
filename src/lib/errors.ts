import { RESULT_TYPE } from "@/lib";

import type { ServerResult } from "@/lib";

export const API_URL = {
  MALFORMED_PATH: "URL path not properly formed.",
} as const;

export function handleError(e: unknown): ServerResult {
  const message = e instanceof Error ? e.message : String(e);
  return { message, type: RESULT_TYPE.ERROR };
}
