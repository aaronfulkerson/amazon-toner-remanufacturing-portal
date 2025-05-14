"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, CheckboxGroup } from "@/components";
import { FormSelectField, FormTextField } from "@/components/form-components";
import { useToast } from "@/components/toast.context";
import { PERMISSION, USER_ROLE } from "@/db/schema";
import { createUser, createUserSchema } from "@/modules/users";

import type { FormEventHandler } from "react";

const permissionsGroups = {
  [USER_ROLE.CUSTOMER]: [PERMISSION.TONER],
  [USER_ROLE.EMPLOYEE]: [
    PERMISSION.REMANUFACTURING,
    PERMISSION.SERVICE,
    PERMISSION.TONER,
  ],
  [USER_ROLE.TECHNICIAN]: [PERMISSION.SERVICE],
} as const;

export function CreateUserForm() {
  const [state, action] = useActionState(createUser, null);
  const [isPending, startTransition] = useTransition();

  const { createToast } = useToast();

  useEffect(() => {
    if (state) createToast(state);
  }, [state]);

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      permissions: [],
      role: "employee" as const,
    },
    resolver: zodResolver(createUserSchema),
  });

  useEffect(() => {
    form.resetField("permissions");
  }, [form.watch("role")]);

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
        name="role"
        render={({ field, fieldState }) => (
          <FormSelectField
            error={fieldState?.error?.message}
            id="role"
            label="Role"
            options={[
              { label: "Customer", value: "customer" },
              { label: "Employee", value: "employee" },
              { label: "Technician", value: "technician" },
            ]}
            {...field}
          />
        )}
      />
      <Controller
        control={form.control}
        name="permissions"
        render={({ field }) => (
          <CheckboxGroup
            options={permissionsGroups[form.watch("role")].map((p) => ({
              label: p,
              value: p,
            }))}
            {...field}
          />
        )}
      />
      <Button className="mt-5" disabled={isPending} size="xl" type="submit">
        Create User
      </Button>
    </form>
  );
}
