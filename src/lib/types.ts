import type { NextRequest, NextResponse } from "next/server";

export type InferRoute<T> = T extends (
  request: NextRequest
) => Promise<NextResponse<infer U>>
  ? U
  : never;

export type ServerResultType = "error" | "info";
export type ServerResult =
  | { message: string; type: ServerResultType }
  | undefined;
