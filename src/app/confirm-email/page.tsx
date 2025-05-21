import { SessionlessFormContainer } from "@/components";
import { ConfirmEmailForm } from "@/modules/confirm-email/components/confirm-email-form";

export default async function ConfirmEmailPage() {
  return (
    <SessionlessFormContainer>
      <ConfirmEmailForm />
    </SessionlessFormContainer>
  );
}
