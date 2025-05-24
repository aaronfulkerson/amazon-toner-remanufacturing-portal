"use client";

import { Checkbox, Label } from "@/components";

import type { ChangeEventHandler } from "react";
import type { LabelProps } from "@/components";

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
  label?: string;
  onChange: (...args: unknown[]) => void;
  options: CheckboxGroupOption[];
  value: string[] | number[];
  wrapperClassName?: string;
}

export function CheckboxGroup({
  cols,
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
    </div>
  );
}
