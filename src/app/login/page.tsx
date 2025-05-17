import { SessionlessFormContainer } from "@/components";
import { LoginForm } from "@/modules/login";

export default function LoginPage() {
  return (
    <SessionlessFormContainer>
      <LoginForm />
    </SessionlessFormContainer>
  );
}
