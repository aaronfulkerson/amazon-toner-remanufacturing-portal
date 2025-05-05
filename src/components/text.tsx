import React from "react";
import { textVariants } from "@/components/text.variants";

import type { TextVariantProps } from "@/components/text.variants";

interface TextProps extends React.ComponentProps<"span">, TextVariantProps {}

export function Text({ children, weight }: TextProps) {
  return <span className={textVariants({ weight })}>{children}</span>;
}
