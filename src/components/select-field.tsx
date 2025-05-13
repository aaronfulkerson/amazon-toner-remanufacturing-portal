import { Error } from "@/components/error";
import { Select } from "@/components/select";
import { Label } from "@/components/label";

import type { ErrorProps } from "@/components/error";
import type { SelectProps } from "@/components/select";
import type { LabelProps } from "@/components/label";
import type { SelectFieldVariantProps } from "@/components/select-field.variants";

export interface SelectFieldProps extends SelectProps, SelectFieldVariantProps {
  error?: string;
  label?: string;
  wrapperClassName?: string;
}

export function SelectField({
  className,
  error,
  intent,
  label,
  size,
  wrapperClassName,
  ...props
}: SelectFieldProps) {
  const errorId = `${props.id}-error`;

  const selectProps: SelectProps = {
    className,
    hasError: !!error,
    intent,
    size,
    ...(error && { "aria-invalid": true }),
    ...(error && props.id && { "aria-describedby": errorId }),
    ...props,
  };

  const labelProps: LabelProps = {
    children: label,
    intent,
    size,
    ...(props.id && { htmlFor: props.id }),
  };

  const errorProps: ErrorProps = {
    children: error,
    intent,
    size,
    ...(props.id && { id: errorId }),
  };

  return (
    <div className={wrapperClassName}>
      {label && <Label className="mb-1" {...labelProps} />}
      <Select {...selectProps} />
      {error && <Error className="mt-1" {...errorProps} />}
    </div>
  );
}
