import Link from "next/link";
import { SessionlessFormContainer } from "@/components";
import { ROUTES } from "@/modules";
import { LoginForm } from "@/modules/login";

export default function LoginPage() {
  return (
    <SessionlessFormContainer>
      <LoginForm />
      <div className="mt-3">
        <Link
          className="text-indigo-600 hover:text-indigo-900 text-sm/6 font-medium"
          href={ROUTES.FORGOT_PASSWORD}
        >
          Forgot Password
        </Link>
      </div>
    </SessionlessFormContainer>
  );
}
