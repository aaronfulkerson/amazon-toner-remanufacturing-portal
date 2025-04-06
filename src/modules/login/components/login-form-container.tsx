export function LoginFormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white rounded-md px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
        {children}
      </div>
    </div>
  );
}
