"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/toast.context";

import type { UseQueryOptions } from "@tanstack/react-query";
import type { ServerResult } from "@/lib";

export function useQueryWithToast<TQueryFnData>(
  fetchUrl: string,
  options: UseQueryOptions<TQueryFnData, ServerResult>
) {
  const router = useRouter();
  const { createToast } = useToast();

  const { error, ...rest } = useQuery({
    queryFn: async () => {
      const response = await fetch(fetchUrl);
      if (response.redirected) {
        router.replace(response.url);
        router.refresh();
      }
      if (response.status !== 200) {
        throw await response.json();
      }
      return await response.json();
    },
    ...options,
  });

  useEffect(() => {
    if (error?.type) createToast(error);
  }, [createToast, error]);

  return { error, ...rest };
}
