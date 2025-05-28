"use client";

import { Checkbox, Label } from "@/components";
import { Error } from "@/components/error";

import type { ChangeEventHandler } from "react";
import type { FieldError } from "react-hook-form";
import type { LabelProps } from "@/components";
import type { ErrorProps } from "@/components/error";

export type CheckboxGroupOption = { label: string; value: string | number };
interface CheckboxGroupOptionProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value">,
    CheckboxGroupOption {
  onChange: CheckboxGroupProps["onChange"];
  groupValue: CheckboxGroupOption["value"][];
}

function CheckboxGroupOption({
  groupValue,
  onChange,
  ...props
}: CheckboxGroupOptionProps) {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.checked
      ? [...groupValue, props.value]
      : groupValue.filter((v) => v !== props.value);
    onChange(newValue);
  };

  return (
    <Checkbox
      checked={groupValue.includes(props.value)}
      onChange={handleOnChange}
      {...props}
    />
  );
}

interface OptionGridProps extends React.ComponentProps<"div"> {
  cols?: number;
}

function OptionGrid({ children, cols = 2 }: OptionGridProps) {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

export interface CheckboxGroupProps
  extends Pick<HTMLDivElement, "id">,
    Pick<HTMLInputElement, "name"> {
  cols?: number;
  error: FieldError["message"];
  label?: string;
  onChange: (...args: unknown[]) => void;
  options: CheckboxGroupOption[];
  value: string[] | number[];
  wrapperClassName?: string;
}

export function CheckboxGroup({
  cols,
  error,
  id,
  label,
  name,
  onChange,
  options,
  value,
  wrapperClassName,
}: CheckboxGroupProps) {
  const labelProps: LabelProps = {
    children: label,
  };

  const errorProps: ErrorProps = {
    children: error,
    ...(id && { id: `${id}-error` }),
  };

  return (
    <div className={wrapperClassName}>
      {label && <Label className="mb-1" {...labelProps} />}
      <OptionGrid cols={cols}>
        {options.map((option) => (
          <CheckboxGroupOption
            groupValue={value}
            key={option.value}
            name={name}
            onChange={onChange}
            {...option}
          />
        ))}
      </OptionGrid>
      {error && <Error className="mt-1" {...errorProps} />}
    </div>
  );
}
