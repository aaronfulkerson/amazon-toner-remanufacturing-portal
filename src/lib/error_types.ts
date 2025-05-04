import { ServerResultType } from "@/lib";

type ErrorType = { [k in Uppercase<ServerResultType>]: ServerResultType };

export const ERROR_TYPE: ErrorType = {
  ERROR: "error",
  INFO: "info",
} as const;
