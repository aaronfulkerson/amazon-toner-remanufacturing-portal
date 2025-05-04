import type { NextRequest } from "next/server";

export function getParam<T = string>(
  request: NextRequest,
  paramName: string,
  conversionFn: (param: string) => T = (param) => String(param) as T
): T | undefined {
  const param = request.nextUrl.searchParams.get(paramName);
  return param ? conversionFn(param) : undefined;
}
