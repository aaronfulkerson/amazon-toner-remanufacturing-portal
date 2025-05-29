"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components";
import { FormTextField } from "@/components/form-components";
import { useToast } from "@/components/toast.context";
import {
  forgotPassword,
  forgotPasswordSchema,
} from "@/modules/forgot-password";

import type { FormEventHandler } from "react";

export function ForgotPasswordForm() {
  const [state, action] = useActionState(forgotPassword, null);
  const [isPending, startTransition] = useTransition();

  const { createToast } = useToast();
  useEffect(() => {
    if (state) createToast(state);
  }, [createToast, state]);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: standardSchemaResolver(forgotPasswordSchema),
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
        name="email"
        render={({ field, fieldState }) => (
          <FormTextField
            error={fieldState.error?.message}
            id="email"
            label="Email"
            type="email"
            {...field}
          />
        )}
      />
      <Button className="mt-5" disabled={isPending} size="xl" type="submit">
        Send Forgot Password Email
      </Button>
    </form>
  );
}
