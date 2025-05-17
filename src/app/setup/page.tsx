import { SessionlessFormContainer } from "@/components";
import { SetupForm } from "@/modules/setup";

export default function SetupPage() {
  return (
    <SessionlessFormContainer>
      <SetupForm />
    </SessionlessFormContainer>
  );
}
