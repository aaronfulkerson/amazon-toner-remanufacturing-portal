import { CheckboxGroupOption, Label } from "@/components";
import { checkboxVariants } from "@/components/checkbox.variants";

interface CheckboxProps
  extends Omit<React.ComponentProps<"input">, "value">,
    CheckboxGroupOption {}

export function Checkbox({ label, ...props }: CheckboxProps) {
  const checkboxProps = {
    ...props,
    id: props.value.toString(),
  };

  const labelProps = {
    children: label,
    htmlFor: props.value.toString(),
  };

  return (
    <div className="flex gap-3">
      <div className="flex h-6 shrink-0 items-center">
        <div className="group grid size-4 grid-cols-1">
          <input
            type="checkbox"
            className={checkboxVariants()}
            {...checkboxProps}
          />
          <svg
            fill="none"
            viewBox="0 0 14 14"
            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-checked:opacity-100"
            />
            <path
              d="M3 7H11"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-indeterminate:opacity-100"
            />
          </svg>
        </div>
      </div>
      {label && <Label className="font-normal" {...labelProps} />}
    </div>
  );
}
