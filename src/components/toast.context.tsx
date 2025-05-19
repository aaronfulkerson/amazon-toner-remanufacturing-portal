"use client";

import { createContext, useCallback, useContext, useState } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { ServerResult } from "@/lib";

export interface Toast extends NonNullable<ServerResult> {
  timestamp: number;
  duration?: number;
  title?: string;
}
type ToastState = Toast[];
type ToastSetState = Dispatch<SetStateAction<ToastState>>;
interface ToastContext {
  state: ToastState;
  setState: ToastSetState;
}

const DEFAULT_TOAST_DURATION = 5000;

export const toastContext = createContext<ToastContext>({} as ToastContext);

interface ToastContextProviderProps {
  children: React.ReactNode;
}

export function ToastContextProvider({ children }: ToastContextProviderProps) {
  const [state, setState] = useState<ToastState>([]);

  return (
    <toastContext.Provider value={{ state, setState }}>
      {children}
    </toastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(toastContext);

  if (!context)
    throw Error("useToast must be used within a ToastContextProvider.");

  const { setState, state } = context;

  const createToast = useCallback(
    function createToast(toast: Omit<Toast, "timestamp">) {
      const timestamp = new Date().valueOf();
      setState((s) => [...s, { ...toast, timestamp }]);
      setTimeout(
        () => setState((s) => s.filter((t) => t.timestamp !== timestamp)),
        toast.duration ?? DEFAULT_TOAST_DURATION
      );
    },
    [setState]
  );

  return { createToast, toastState: state };
}
