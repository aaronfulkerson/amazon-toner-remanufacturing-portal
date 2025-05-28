import { Error } from "@/components/error";
import { Input } from "@/components/input";
import { Label } from "@/components/label";

import type { FieldError } from "react-hook-form";
import type { ErrorProps } from "@/components/error";
import type { InputProps } from "@/components/input";
import type { LabelProps } from "@/components/label";
import type { TextFieldVariantProps } from "@/components/text-field.variants";

export interface TextFieldProps extends InputProps, TextFieldVariantProps {
  error: FieldError["message"];
  label?: string;
  wrapperClassName?: string;
}

export function TextField({
  className,
  error,
  icon,
  intent,
  label,
  size,
  wrapperClassName,
  ...props
}: TextFieldProps) {
  const errorId = `${props.id}-error`;

  const inputProps: InputProps = {
    className,
    hasError: !!error,
    icon,
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
      <Input {...inputProps} />
      {error && <Error className="mt-1" {...errorProps} />}
    </div>
  );
}
