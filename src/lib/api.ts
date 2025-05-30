import { API_URL } from "@/lib";

import type { PaginationState } from "@tanstack/react-table";

export function getApiUrl(
  apiPath: string,
  params?: { pagination?: PaginationState; queryObj?: Record<string, string> }
): string {
  if (!/^\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+\/?)*$/.test(apiPath)) {
    throw Error(API_URL.MALFORMED_PATH);
  }

  const baseUrl = "/api" + apiPath;
  const searchParams = new URLSearchParams({
    ...(params?.pagination && {
      limit: params.pagination.pageSize.toString(),
      offset: (
        params.pagination.pageIndex * params.pagination.pageSize
      ).toString(),
    }),
    ...params?.queryObj,
  }).toString();

  if (!searchParams) return baseUrl;

  return baseUrl + "?" + searchParams;
}
