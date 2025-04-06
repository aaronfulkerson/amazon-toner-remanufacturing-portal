import { DynamicIcon } from "lucide-react/dynamic";
import { iconVariants, inputVariants } from "@/components/input.variants";
import { cnMerge } from "@/lib/ui";

import type { IconName } from "lucide-react/dynamic";
import type { InputVariantProps } from "@/components/input.variants";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    InputVariantProps {
  icon?: IconName;
}

export function Input({
  className,
  hasError,
  icon,
  size,
  variant,
  ...props
}: InputProps) {
  const iconName = hasError ? "circle-alert" : icon;

  return (
    <div className="grid grid-cols-1">
      <input
        className={cnMerge(
          inputVariants({ className, hasError, size, variant })
        )}
        {...props}
      />
      {iconName && (
        <DynamicIcon
          aria-hidden="true"
          className={cnMerge(iconVariants({ className, hasError }))}
          name={iconName}
        />
      )}
    </div>
  );
}
