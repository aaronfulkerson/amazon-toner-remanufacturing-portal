import { ControllerRenderProps } from "react-hook-form";
import { TextField } from "@/components/text-field";

import type { TextFieldProps } from "@/components/text-field";

interface FormTextFieldProps
  extends Omit<TextFieldProps, keyof ControllerRenderProps>,
    ControllerRenderProps {}

export function FormTextField(props: FormTextFieldProps) {
  return <TextField {...props} />;
}
