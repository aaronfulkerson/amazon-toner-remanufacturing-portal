import type { NextRequest } from "next/server";

export function getParam(
  request: NextRequest,
  paramName: string
): string | undefined;
export function getParam<T>(
  request: NextRequest,
  paramName: string,
  conversionFn: (param: string) => T
): T | undefined;
export function getParam(
  request: NextRequest,
  paramName: string,
  conversionFn: (param: string) => unknown = (param) => String(param)
): unknown {
  const param = request.nextUrl.searchParams.get(paramName);
  return param ? conversionFn(param) : undefined;
}
