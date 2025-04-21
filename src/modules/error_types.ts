import { ActionResultType } from "@/modules";

type ErrorType = { [k in Uppercase<ActionResultType>]: ActionResultType };

export const ErrorType: ErrorType = {
  ERROR: "error",
  INFO: "info",
} as const;
