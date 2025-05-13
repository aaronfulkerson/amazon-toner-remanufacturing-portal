import { ControllerRenderProps } from "react-hook-form";
import { SelectField } from "@/components/select-field";

import type { SelectFieldProps } from "@/components/select-field";

interface FormSelectFieldProps
  extends Omit<SelectFieldProps, keyof ControllerRenderProps>,
    ControllerRenderProps {}

export function FormSelectField(props: FormSelectFieldProps) {
  return <SelectField {...props} />;
}
