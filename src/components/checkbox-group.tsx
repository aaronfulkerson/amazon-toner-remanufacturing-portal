"use client";

import { useState } from "react";

import type { ChangeEventHandler } from "react";
import type { ControllerRenderProps } from "react-hook-form";

type CheckboxGroupOption = {
  label: string;
  value: string | number;
};
interface CheckboxGroupOptionProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value">,
    Pick<ControllerRenderProps, "onChange">,
    CheckboxGroupOption {
  groupValue: CheckboxGroupOption["value"][];
}

function CheckboxGroupOption({
  label,
  onChange,
  value,
}: CheckboxGroupOptionProps) {
  const [checked, setChecked] = useState(false);
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked);
    const newValue = ["a"];
    if (!!onChange) onChange(newValue);
  };

  return (
    <label>
      <input
        checked={checked}
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
