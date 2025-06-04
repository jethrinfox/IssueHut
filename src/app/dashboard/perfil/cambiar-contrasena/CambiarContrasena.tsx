"use client";

import FormErrorsProvider from "@/components/forms/FormErrorsProvider";
import InputField from "@/components/forms/ui/InputField";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  type ChangePasswordForm,
  changePasswordSchemaForm,
} from "@/server/db/schema/user";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CambiarContrasena = () => {
  const { mutateAsync } = api.user.changePassword.useMutation();
  const router = useRouter();

  const form = useForm<ChangePasswordForm>({
    defaultValues: {
      new_password: "",
      old_password: "",
      validate_password: "",
    },
    resolver: zodResolver(changePasswordSchemaForm),
  });

  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    await toast.promise(
      mutateAsync({
        new_password: data.new_password,
        old_password: data.old_password,
      }),
      {
        error: <b>Hubo un error...</b>,
        loading: "Cambiando contraseña...",
        success: <b>Contraseña cambiada!</b>,
      },
    );

    router.push("/dashboard");
  };

  const isSubmitDisabled = form.formState.isSubmitting;

  return (
    <Card className="m-auto w-full max-w-sm">
      <CardHeader>
        <Form {...form}>
          <form
            className="grid flex-1 gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CardTitle className="mb-2 text-2xl">
              Ingresa tu nueva contraseña
            </CardTitle>
            <div className="grid gap-6">
              <InputField
                label="Contraseña vieja"
                name="old_password"
                type="password"
              />
              <InputField
                label="Contraseña nueva"
                name="new_password"
                type="password"
              />
              <InputField
                label="Contraseña nueva (repetir)"
                name="validate_password"
                type="password"
              />
            </div>
            <Button
              className="w-full"
              disabled={isSubmitDisabled}
              type="submit"
            >
              {isSubmitDisabled && <Spinner />}
              Cambiar Contraseña
            </Button>
          </form>
        </Form>
      </CardHeader>
    </Card>
  );
};

export default CambiarContrasena;
