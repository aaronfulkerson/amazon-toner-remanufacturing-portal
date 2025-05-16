import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/components/toast.context";

import type { UseQueryOptions } from "@tanstack/react-query";
import type { ServerResult } from "@/lib";

export function useQueryWithToast<TQueryFnData>(
  options: UseQueryOptions<TQueryFnData, ServerResult>
) {
  const { error, ...rest } = useQuery(options);

  const { createToast } = useToast();
  useEffect(() => {
    if (error) createToast(error);
  }, [error]);

  return { error, ...rest };
}
