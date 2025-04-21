import { NavigationMenu } from "radix-ui";

interface NavigationContainerProps {
  children: React.ReactNode;
}

export function NavigationContainer({ children }: NavigationContainerProps) {
  return (
    <NavigationMenu.Root orientation="vertical">
      <NavigationMenu.List className="-mx-2 space-y-1">
        {children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
