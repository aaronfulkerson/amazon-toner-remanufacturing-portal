import { ServerResultType } from "@/modules";

type ErrorType = { [k in Uppercase<ServerResultType>]: ServerResultType };

export const ErrorType: ErrorType = {
  ERROR: "error",
  INFO: "info",
} as const;
