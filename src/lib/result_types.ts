import { ServerResultType } from "@/lib";

type ResultType = { [k in Uppercase<ServerResultType>]: ServerResultType };

export const RESULT_TYPE: ResultType = {
  ERROR: "error",
  INFO: "info",
  SUCCESS: "success",
} as const;
