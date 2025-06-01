import type { ServerResult, ServerResultType } from "@/lib";

export function getServerResult(
  message: string,
  type: ServerResultType
): ServerResult {
  return { message, type };
}
