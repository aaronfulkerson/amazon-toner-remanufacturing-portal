import { API_URL_ERROR } from "@/lib";

import type { PaginationState } from "@tanstack/react-table";

export function createApiUrl(
  apiPath: string,
  params?: { pagination?: PaginationState; queryObj?: Record<string, string> }
): string {
  if (!/^\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+\/?)*$/.test(apiPath)) {
    throw Error(API_URL_ERROR.MALFORMED_PATH);
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
