"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components";
import { FormTextField } from "@/components/form-components";
import { useToast } from "@/components/toast.context";
import { ROUTES } from "@/modules/routes";
import { resetPassword, resetPasswordSchema } from "@/modules/reset-password";

import type { FormEventHandler } from "react";

export function ResetPasswordForm() {
  const [state, action] = useActionState(resetPassword, null);
  const [isPending, startTransition] = useTransition();

  const { createToast } = useToast();
  useEffect(() => {
    if (state) createToast(state);
  }, [createToast, state]);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) redirect(ROUTES.LOGIN);

  const form = useForm({
    defaultValues: {
      password: "",
      passwordConfirmation: "",
      token,
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    form.handleSubmit(() => {
      startTransition(() => action(new FormData(formRef.current!)));
    })(e);
  };

  return (
    <form
      action={action}
      className="grid grid-cols-1 gap-3"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <FormTextField
            error={fieldState.error?.message}
            id="password"
            label="Password"
            type="password"
            {...field}
          />
        )}
      />
      <Controller
        control={form.control}
        name="passwordConfirmation"
        render={({ field, fieldState }) => (
          <FormTextField
            error={fieldState.error?.message}
            id="passwordConfirmation"
            label="Confirmation"
            type="password"
            {...field}
          />
        )}
      />
      <input name="token" type="hidden" value={token} />
      <Button className="mt-5" disabled={isPending} size="xl" type="submit">
        Reset Password
      </Button>
    </form>
  );
}
