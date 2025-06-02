import type { ServerResult, ServerResultType } from "@/lib";

export function createServerResult(
  message: string,
  type: ServerResultType
): ServerResult {
  return { message, type };
}
