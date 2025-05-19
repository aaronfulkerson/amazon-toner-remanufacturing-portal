import { SessionlessFormContainer } from "@/components";
import { ResetPasswordForm } from "@/modules/reset-password";

export default function ResetPasswordPage() {
  return (
    <SessionlessFormContainer>
      <ResetPasswordForm />
    </SessionlessFormContainer>
  );
}
