"use client";

import { createContext, useContext, useState } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { ServerResult } from "@/lib";

export interface Toast extends NonNullable<ServerResult> {
  id: number;
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

  function createToast(toast: Omit<Toast, "id">) {
    const id = (state.at(-1)?.id ?? 0) + 1;

    setState((s) => [...s, { ...toast, id }]);

    setTimeout(
      () => setState((s) => s.filter((t) => t.id !== id)),
      toast.duration ?? DEFAULT_TOAST_DURATION
    );
  }

  return { createToast, toastState: state };
}
