import { API_URL } from "@/lib";

import type { PaginationState } from "@tanstack/react-table";

export function getApiUrl(
  apiPath: string,
  pagination?: PaginationState,
  queryObj?: Record<string, string>
): string {
  if (!/^\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+\/?)*$/.test(apiPath)) {
    throw Error(API_URL.MALFORMED_PATH);
  }

  const baseUrl = "/api" + apiPath;
  const searchParams = new URLSearchParams({
    ...(pagination && {
      limit: pagination.pageSize.toString(),
      offset: (pagination.pageIndex * pagination.pageSize).toString(),
    }),
    ...queryObj,
  }).toString();

  if (!searchParams) return baseUrl;

  return baseUrl + "?" + searchParams;
}
