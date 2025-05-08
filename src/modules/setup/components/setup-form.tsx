"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components";
import { FormTextField } from "@/components/form-components";
import { useToast } from "@/components/toast.context";
import {
  createAdmin,
  createAdminSchema,
  SetupFormContainer,
} from "@/modules/setup";

import type { FormEventHandler } from "react";

export function SetupForm() {
  const [state, action] = useActionState(createAdmin, null);
  const [isPending, startTransition] = useTransition();

  const { createToast } = useToast();

  useEffect(() => {
    if (state) createToast(state);
  }, [state]);

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(createAdminSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    form.handleSubmit(() => {
      startTransition(() => action(new FormData(formRef.current!)));
    })(e);
  };

  return (
    <SetupFormContainer>
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
              error={fieldState?.error?.message}
              id="email"
              label="Email"
              type="email"
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormTextField
              error={fieldState?.error?.message}
              id="name"
              label="Name"
              type="text"
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormTextField
              error={fieldState?.error?.message}
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
              error={fieldState?.error?.message}
              id="passwordConfirmation"
              label="Confirmation"
              type="password"
              {...field}
            />
          )}
        />
        <Button className="mt-5" disabled={isPending} size="xl" type="submit">
          Confirm Setup
        </Button>
      </form>
    </SetupFormContainer>
  );
}
