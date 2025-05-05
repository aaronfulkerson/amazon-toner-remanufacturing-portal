import { FETCH_ERRORS } from "@/lib";

import type { PaginationState } from "@tanstack/react-table";

export function getFetchUrl(apiPath: string, pagination: PaginationState) {
  if (!/^\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+\/?)*$/.test(apiPath)) {
    throw Error(FETCH_ERRORS.MALFORMED_PATH);
  }

  const baseUrl = "/api" + apiPath + "?";
  const searchParams = new URLSearchParams({
    limit: pagination.pageSize.toString(),
    offset: pagination.pageIndex.toString(),
  }).toString();

  return baseUrl + searchParams;
}
