import { labelVariants } from "@/components/label.variants";
import { cnMerge } from "@/lib/ui";

import type { LabelVariantProps } from "@/components/label.variants";

export interface LabelProps
  extends React.ComponentProps<"label">,
    LabelVariantProps {}

export function Label({
  children,
  className,
  intent,
  size,
  ...props
}: LabelProps) {
  return (
    <label
      className={cnMerge(labelVariants({ className, intent, size }))}
      {...props}
    >
      {children}
    </label>
  );
}
