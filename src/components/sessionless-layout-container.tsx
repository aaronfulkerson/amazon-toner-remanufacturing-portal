interface SessionlessLayoutContainerProps {
  children: React.ReactNode;
}

export function SessionlessLayoutContainer({
  children,
}: SessionlessLayoutContainerProps) {
  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      {children}
    </div>
  );
}
