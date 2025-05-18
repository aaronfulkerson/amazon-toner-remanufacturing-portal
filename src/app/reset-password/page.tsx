import { SessionlessFormContainer } from "@/components";
import { ResetPasswordForm } from "@/modules/reset-password";

export default function LoginPage() {
  return (
    <SessionlessFormContainer>
      <ResetPasswordForm />
    </SessionlessFormContainer>
  );
}
