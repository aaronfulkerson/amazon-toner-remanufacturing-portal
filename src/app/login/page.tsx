import { SessionlessFormContainer } from "@/components";
import { LoginForm } from "@/modules/login";

export function LoginModulePage() {
  return (
    <SessionlessFormContainer>
      <LoginForm />
    </SessionlessFormContainer>
  );
}
