"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, SelectField, TextField } from "@/components";
import { FormCheckboxGroup } from "@/components/form-components";
import { useToast } from "@/components/toast.context";
import { VALID_ROLE_PERMISSIONS } from "@/modules/permissions";
import { updateUser, updateUserSchema } from "@/modules/users";

import type { FormEventHandler } from "react";
import type { User } from "@/modules/users";

interface EditUserFormProps {
  closeModal: () => void;
  user: User;
}

export function EditUserForm({ closeModal, user }: EditUserFormProps) {
  const [state, action] = useActionState(updateUser, null);
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
      id: user.id,
      permissions: user.permissions,
      role: user.role,
    },
    resolver: standardSchemaResolver(updateUserSchema),
  });

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
      <input name="id" type="hidden" value={user.id} />
      <input name="role" type="hidden" value={user.role} />
      <TextField
        disabled
        id="name"
        label="Name"
        type="text"
        value={user.name}
      />
      <TextField
        disabled
        id="email"
        label="Email"
        type="email"
        value={user.email}
      />
      <SelectField
        disabled
        id="role"
        label="Role"
        options={[
          { label: "Customer", value: "customer" },
          { label: "Employee", value: "employee" },
          { label: "Technician", value: "technician" },
        ]}
        value={user.role}
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
            options={VALID_ROLE_PERMISSIONS[
              user.role as "customer" | "employee" | "technician"
            ].map((p) => ({
              label: p,
              value: p,
            }))}
            {...field}
          />
        )}
      />
      <Button className="mt-5" disabled={isPending} size="xl" type="submit">
        Update User
      </Button>
    </form>
  );
}
