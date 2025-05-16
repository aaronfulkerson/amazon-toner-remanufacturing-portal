import { CheckboxGroup } from "@/components";

import type { ControllerRenderProps } from "react-hook-form";

interface FormCheckboxGroupProps
  extends Omit<
      React.ComponentProps<typeof CheckboxGroup>,
      keyof ControllerRenderProps
    >,
    ControllerRenderProps {}

export function FormCheckboxGroup(props: FormCheckboxGroupProps) {
  return <CheckboxGroup {...props} />;
}
