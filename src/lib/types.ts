import type { NextRequest, NextResponse } from "next/server";

export type InferRoute<T> = T extends (
  request: NextRequest
) => Promise<NextResponse<infer U>>
  ? U
  : never;
