"use client";

import type { ChangeEventHandler } from "react";
import type { ControllerRenderProps } from "react-hook-form";

type CheckboxGroupOption = {
  label: string;
  value: string | number;
};
interface CheckboxGroupOptionProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value">,
    NonNullable<Pick<ControllerRenderProps, "onChange">>,
    CheckboxGroupOption {
  groupValue: CheckboxGroupOption["value"][];
}

function CheckboxGroupOption({
  groupValue,
  label,
  onChange,
  value,
}: CheckboxGroupOptionProps) {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.checked
      ? [...groupValue, value]
      : groupValue.filter((v) => v !== value);
    onChange(newValue);
  };

  return (
    <label>
      <input
        checked={groupValue.includes(value)}
        onChange={handleOnChange}
        type="checkbox"
        value={value}
      />
      {label}
    </label>
  );
}

interface CheckboxGroupProps extends ControllerRenderProps {
  options: CheckboxGroupOption[];
}

export function CheckboxGroup({
  onChange,
  options,
  value,
}: CheckboxGroupProps) {
  return (
    <div>
      {options.map((option) => {
        return (
          <CheckboxGroupOption
            groupValue={value}
            key={option.value}
            onChange={onChange}
            {...option}
          />
        );
      })}
    </div>
  );
}
