import { ControllerRenderProps } from "react-hook-form";
import { CheckboxGroup } from "../checkbox-group";

interface FormCheckboxGroupProps
  extends Omit<
      React.ComponentProps<typeof CheckboxGroup>,
      keyof ControllerRenderProps
    >,
    ControllerRenderProps {}

export function FormCheckboxGroup(props: FormCheckboxGroupProps) {
  return <CheckboxGroup {...props} />;
}
