"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  FormEventHandler,
  useActionState,
  useEffect,
  useRef,
  useTransition,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components";
import { FormTextField } from "@/components/form-components";
import { useToast } from "@/components/toast.context";
import { login, loginSchema } from "@/modules/login";

export function LoginForm() {
  const [state, action] = useActionState(login, null);
  const [isPending, startTransition] = useTransition();

  const { createToast } = useToast();

  useEffect(() => {
    if (state) createToast(state);
  }, [createToast, state]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: standardSchemaResolver(loginSchema),
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
      <Button className="mt-5" disabled={isPending} size="xl" type="submit">
        Login
      </Button>
    </form>
  );
}
