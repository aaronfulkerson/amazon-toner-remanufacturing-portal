import { SessionlessFormContainer } from "@/components";
import { ForgotPasswordForm } from "@/modules/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <SessionlessFormContainer>
      <ForgotPasswordForm />
    </SessionlessFormContainer>
  );
}
