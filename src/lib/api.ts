import { API_URL } from "@/lib";

import type { PaginationState } from "@tanstack/react-table";

export function getApiUrl(
  apiPath: string,
  pagination: PaginationState
): string {
  if (!/^\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+\/?)*$/.test(apiPath)) {
    throw Error(API_URL.MALFORMED_PATH);
  }

  const baseUrl = "/api" + apiPath + "?";
  const searchParams = new URLSearchParams({
    limit: pagination.pageSize.toString(),
    offset: pagination.pageIndex.toString(),
  }).toString();

  return baseUrl + searchParams;
}
