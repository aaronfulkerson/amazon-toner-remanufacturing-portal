import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/components/toast.context";

import type { UseQueryOptions } from "@tanstack/react-query";
import type { ServerResult } from "@/lib";

export function useQueryWithToast<T>(
  options: UseQueryOptions<T, ServerResult>
) {
  const { error, ...rest } = useQuery(options);

  const { createToast } = useToast();
  useEffect(() => {
    if (error) createToast(error);
  }, [error]);

  return { error, ...rest };
}
