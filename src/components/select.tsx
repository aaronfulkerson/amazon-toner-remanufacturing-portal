import { ChevronDown } from "lucide-react";
import { iconVariants, selectVariants } from "@/components/select.variants";
import { cnMerge } from "@/lib/ui";

import type { SelectVariantProps } from "@/components/select.variants";

type Option = { label: string; value: string | number };
export interface SelectProps
  extends Omit<React.ComponentProps<"select">, "size">,
    SelectVariantProps {
  options: Option[];
}

export function Select({
  className,
  hasError,
  intent,
  options,
  size,
  ...props
}: SelectProps) {
  return (
    <div className="grid grid-cols-1">
      <select
        className={cnMerge(
          selectVariants({ className, hasError, intent, size })
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className={iconVariants()} />
    </div>
  );
}
