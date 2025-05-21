import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/components/toast.context";

import type { UseQueryOptions } from "@tanstack/react-query";
import type { ServerResult } from "@/lib";

export function useQueryWithToast<TQueryFnData>(
  fetchUrl: string,
  options: UseQueryOptions<TQueryFnData, ServerResult>
) {
  const { createToast } = useToast();

  const { error, ...rest } = useQuery({
    queryFn: async () => {
      const response = await fetch(fetchUrl);
      if (response.status !== 200) throw await response.json();
      return await response.json();
    },
    ...options,
  });

  useEffect(() => {
    if (error) createToast(error);
  }, [createToast, error]);

  return { error, ...rest };
}
