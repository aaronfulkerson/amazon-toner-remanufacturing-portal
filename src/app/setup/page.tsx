import { SessionlessFormContainer } from "@/components";
import { SetupForm } from "@/modules/setup";

export function SetupModulePage() {
  return (
    <SessionlessFormContainer>
      <SetupForm />
    </SessionlessFormContainer>
  );
}
