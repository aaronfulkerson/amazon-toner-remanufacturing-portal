import type { NextRequest } from "next/server";

export function getParam<T>(
  request: NextRequest,
  paramName: string,
  conversionFn: (param: string) => T
): T | undefined {
  const searchParams = request.nextUrl.searchParams;
  const param = searchParams.get(paramName);
  return param ? conversionFn(param) : undefined;
}
