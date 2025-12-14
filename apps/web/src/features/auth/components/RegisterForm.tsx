"use client";

import { useTranslations } from "next-intl";
import z from "zod";
import { MINIMUM_PASSWORD_LENGTH } from "../constants/credentials";
import { ZodIssueCode } from "zod/v3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { register } from "../api/register";
import { handleAppError } from "@/lib/error";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const t = useTranslations("pages.register.form");

  const RegisterFormSchema = z
    .object({
      name: z.string().nonempty({
        message: t("name.error.required"),
      }),
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
      verifyPassword: z
        .string()
        .nonoptional({ message: t("verify-password.error.required") }),
    })
    .superRefine((val, ctx) => {
      if (val.password !== val.verifyPassword) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: t("verify-password.error.match"),
          path: ["verifyPassword"],
        });
      }
    });
  type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
  });

  const onSubmit = async ({ name, email, password }: RegisterFormSchema) => {
    register({
      username: name,
      email,
      password,
    })
      .then(() => {
        redirect("/auth/login");
      })
      .catch((error) => {
        handleAppError(error);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="my-4">
              <div className="flex justify-between items-center">
                <FormLabel>{t("name.label")}</FormLabel>
                {error ? (
                  <FormMessage />
                ) : (
                  <FormDescription>{t("name.description")}</FormDescription>
                )}
              </div>
              <FormControl>
                <Input placeholder={t("name.placeholder")} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="verifyPassword"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="my-4">
              <div className="flex justify-between items-center">
                <FormLabel>{t("verify-password.label")}</FormLabel>
                {error ? (
                  <FormMessage />
                ) : (
                  <FormDescription>
                    {t("verify-password.description")}
                  </FormDescription>
                )}
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("verify-password.placeholder")}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full">{t("submit")}</Button>
        <Button className="w-full" variant="link">
          <Link href="/auth/login">{t("login")}</Link>
        </Button>
      </form>
    </Form>
  );
}
