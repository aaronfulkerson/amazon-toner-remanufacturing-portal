import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cnMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
