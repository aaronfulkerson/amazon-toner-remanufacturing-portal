import { CheckboxGroup } from "@/components";

import type { ControllerRenderProps } from "react-hook-form";
import type { CheckboxGroupProps } from "@/components";

interface FormCheckboxGroupProps
  extends Omit<CheckboxGroupProps, keyof ControllerRenderProps>,
    ControllerRenderProps {}

export function FormCheckboxGroup(props: FormCheckboxGroupProps) {
  return <CheckboxGroup {...props} />;
}
