"use client";

import InputField from "@/components/forms/ui/InputField";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import useIsMounted from "@/hooks/useIsMounted";
import handleLogin from "@/server/actions/login";
import { type SignInForm, signInSchema } from "@/server/db/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login: FC = () => {
  const form = useForm<SignInForm>({
    defaultValues: {
      password: "",
      username: "",
    },
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const isMounted = useIsMounted();

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    await toast.promise(handleLogin(data), {
      error: (error) => {
        const loginError = error?.message;
        return <b>{loginError ?? "Hubo un error..."}</b>;
      },
      loading: "Iniciando sesión...",
      success: <b>Sesión iniciada!</b>,
    });

    router.push("/dashboard");
  };

  const isSubmitDisabled = form.formState.isSubmitting || !isMounted;

  return (
    <Card className="m-auto w-full max-w-sm">
      <CardHeader>
        <Form {...form}>
          <form
            className="grid flex-1 gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CardTitle className="mb-2 text-2xl">Inicio de sesión</CardTitle>
            <div className="grid gap-6">
              <InputField
                autoFocus
                label="Usuario"
                name="username"
                type="text"
              />
              <InputField label="Contraseña" name="password" type="password" />
            </div>
            <Button
              className="w-full"
              disabled={isSubmitDisabled}
              type="submit"
            >
              {isSubmitDisabled && <Spinner />}
              Iniciar Sesión
            </Button>
          </form>
        </Form>
      </CardHeader>
    </Card>
  );
};

export default Login;
