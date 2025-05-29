"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { redirect, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components";
import { FormTextField } from "@/components/form-components";
import { useToast } from "@/components/toast.context";
import { ROUTES } from "@/modules/routes";
import { confirmEmail, confirmEmailSchema } from "@/modules/confirm-email";

import type { FormEventHandler } from "react";

export function ConfirmEmailForm() {
  const [state, action] = useActionState(confirmEmail, null);
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
    resolver: standardSchemaResolver(confirmEmailSchema),
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
        Confirm Email
      </Button>
    </form>
  );
}
