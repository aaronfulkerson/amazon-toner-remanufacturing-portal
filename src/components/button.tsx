import { Slot } from "@radix-ui/react-slot";
import { DynamicIcon } from "lucide-react/dynamic";
import { buttonVariants, iconVariants } from "@/components/button.variants";
import { cnMerge } from "@/lib/ui";

import type { IconName } from "lucide-react/dynamic";
import type { ButtonVariantProps } from "@/components/button.variants";

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "size">,
    Omit<ButtonVariantProps, "disabled"> {
  asChild?: boolean;
  icon?: IconName;
}

export function Button({
  asChild = false,
  children,
  className,
  disabled,
  icon,
  size,
  intent,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cnMerge(buttonVariants({ className, disabled, intent, size }))}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <DynamicIcon
          aria-hidden="true"
          className={cnMerge(iconVariants({ disabled, size }))}
          name={icon}
        />
      )}
      {children}
    </Comp>
  );
}
