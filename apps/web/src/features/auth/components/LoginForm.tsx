"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MINIMUM_PASSWORD_LENGTH } from "../constants/credentials";
import { ErrorCode, handleAppError } from "@/lib/error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLogin } from "@/lib/auth";

export default function LoginForm() {
  const t = useTranslations("pages.login.form");
  const router = useRouter();

  const LoginFormSchema = z.object({
    email: z
      .email({ message: t("email.error.email") })
      .nonoptional({ message: t("email.error.required") }),
    password: z
      .string()
      .min(MINIMUM_PASSWORD_LENGTH, {
        message: t("password.error.min", {
          min: MINIMUM_PASSWORD_LENGTH,
        }),
      })
      .nonoptional({ message: t("password.error.required") }),
  });
  type LoginFormValues = z.infer<typeof LoginFormSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login } = useLogin();

  const onSubmit = async (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        router.push("/app");
      },
      onError: (error) =>
        handleAppError(error, {
          [ErrorCode.UNAUTHORIZED]: () => {
            toast.error(t("errors.invalid-credentials"));
          },
        }),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="my-4">
              <div className="flex justify-between items-center">
                <FormLabel>{t("email.label")}</FormLabel>
                {error ? (
                  <FormMessage />
                ) : (
                  <FormDescription>{t("email.description")}</FormDescription>
                )}
              </div>
              <FormControl>
                <Input placeholder={t("email.placeholder")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="my-4">
              <div className="flex justify-between items-center">
                <FormLabel>{t("password.label")}</FormLabel>
                {error ? (
                  <FormMessage />
                ) : (
                  <FormDescription>{t("password.description")}</FormDescription>
                )}
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("password.placeholder")}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full">{t("submit")}</Button>
        <Button className="w-full" variant="link">
          <Link href="/auth/register">{t("register")}</Link>
        </Button>
      </form>
    </Form>
  );
}
