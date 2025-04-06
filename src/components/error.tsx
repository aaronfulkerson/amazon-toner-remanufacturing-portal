import { errorVariants } from "@/components/error.variants";
import { cnMerge } from "@/lib/ui";

import type { ErrorVariantProps } from "@/components/error.variants";

export interface ErrorProps
  extends React.ComponentProps<"p">,
    ErrorVariantProps {}

export function Error({
  children,
  className,
  intent,
  size,
  ...props
}: ErrorProps) {
  return (
    <p
      className={cnMerge(errorVariants({ className, intent, size }))}
      {...props}
    >
      {children}
    </p>
  );
}
