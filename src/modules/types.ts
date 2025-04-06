export type ActionResultType = "error" | "info";
export type ActionResult =
  | { message: string; type: ActionResultType }
  | undefined;
