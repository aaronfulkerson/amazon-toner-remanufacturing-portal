"use client";

import { DynamicIcon } from "lucide-react/dynamic";
import { Toast } from "radix-ui";
import { ToastContextProvider, useToast } from "@/components/toast.context";
import {
  toastDescriptionVariants,
  toastRootVariants,
  toastTitleVariants,
  toastViewportVariants,
} from "@/components/toast.variants";
import { cnMerge } from "@/lib/ui";

import type { IconName } from "lucide-react/dynamic";
import type { Toast as ToastItemProps } from "@/components/toast.context";
import type { ServerResultType } from "@/modules/types";

type ToastIcon = { [k in ServerResultType]: IconName };

const iconMap: ToastIcon = { error: "circle-x", info: "info" };

function ToastItem({ message, title, type }: ToastItemProps) {
  return (
    <Toast.Root className={cnMerge(toastRootVariants({ type }))} open={true}>
      <Toast.Title className={toastTitleVariants({ type })}>
        <DynamicIcon name={iconMap[type]} size={20} />
        {title ?? type.toUpperCase()}
      </Toast.Title>
      <Toast.Description className={toastDescriptionVariants({ type })}>
        {message}
      </Toast.Description>
    </Toast.Root>
  );
}

function ToastContainer() {
  const { toastState } = useToast();

  return (
    <Toast.Provider swipeDirection="right">
      {toastState.map((t) => (
        <ToastItem key={t.id} {...t} />
      ))}
      <Toast.Viewport className={toastViewportVariants()} />
    </Toast.Provider>
  );
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <ToastContextProvider>
      <ToastContainer />
      {children}
    </ToastContextProvider>
  );
}
