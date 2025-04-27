import { Heading, HeadingProps } from "@/components";

interface PageHeadingProps extends HeadingProps {
  actions?: React.ReactNode;
}

export function PageHeading({ actions, ...props }: PageHeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Heading {...props} />
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  );
}
