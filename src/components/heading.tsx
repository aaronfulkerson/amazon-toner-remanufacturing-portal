import { headingVariants } from "@/components/heading.variants";

import type { HeadingVariantProps } from "@/components/heading.variants";

interface HeadingProps extends HeadingVariantProps {
  children: React.ReactNode;
}

export function Heading({ children, size }: HeadingProps) {
  return <h1 className={headingVariants({ size })}>{children}</h1>;
}
