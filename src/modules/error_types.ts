import { ActionResultType } from "@/modules";

type ErrorType = { [k in Uppercase<ActionResultType>]: ActionResultType };

export const ERROR_TYPES: ErrorType = {
  ERROR: "error",
  INFO: "info",
} as const;
