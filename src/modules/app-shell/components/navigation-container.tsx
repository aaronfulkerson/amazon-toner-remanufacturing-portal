import { NavigationMenu } from "radix-ui";

interface NavigationContainerProps {
  children: React.ReactNode;
}

export function NavigationContainer({ children }: NavigationContainerProps) {
  return (
    <NavigationMenu.Root className="-mx-2 space-y-1" orientation="vertical">
      <NavigationMenu.List>{children}</NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
