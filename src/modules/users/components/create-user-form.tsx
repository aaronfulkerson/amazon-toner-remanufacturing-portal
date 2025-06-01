"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components";
import {
  FormCheckboxGroup,
  FormSelectField,
  FormTextField,
} from "@/components/form-components";
import { useToast } from "@/components/toast.context";
import { VALID_ROLE_PERMISSIONS } from "@/modules/permissions";
import { createUser, createUserSchema } from "@/modules/users";

import type { FormEventHandler } from "react";

interface CreateUserFormProps {
  closeModal: () => void;
}

export function CreateUserForm({ closeModal }: CreateUserFormProps) {
  const [state, action] = useActionState(createUser, null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const { createToast } = useToast();

  useEffect(() => {
    if (state) createToast(state);
    if (state?.type === "success") {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
    }
  }, [closeModal, createToast, queryClient, state]);

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      permissions: [],
      role: "employee" as const,
    },
    resolver: standardSchemaResolver(createUserSchema),
  });

  const role = form.watch("role");
  useEffect(() => {
    form.resetField("permissions");
  }, [form, role]);

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
            error={fieldState.error?.message}
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
        name="role"
        render={({ field, fieldState }) => (
          <FormSelectField
            error={fieldState.error?.message}
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
        render={({ field, fieldState }) => (
          <FormCheckboxGroup
            cols={2}
            error={fieldState.error?.message}
            id="permissions"
            label="Permissions"
            options={VALID_ROLE_PERMISSIONS[role].map((p) => ({
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
