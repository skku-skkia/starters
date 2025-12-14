"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { resendVerificationEmail } from "@/features/auth/api/resend-verification-email";
import { useVerifyEmailMutation } from "@/features/auth/api/verify-email";
import { useViewer } from "@/features/user/api/get-viewer";
import { useUpdateUserMutation } from "@/features/user/api/update-user";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmailVerification() {
  const t = useTranslations("pages.onboarding.email-verification");
  const router = useRouter();

  const [verificationCode, setVerificationCode] = useState("");

  const { data: user } = useViewer();
  const { mutate: verifyEmail } = useVerifyEmailMutation();
  const { mutate: updateUser } = useUpdateUserMutation();

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <InputOTP
            minLength={6}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={(value) => setVerificationCode(value)}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTP>

          <div className="flex w-full flex-col items-center gap-4">
            <Button
              className="w-full"
              onClick={() => {
                if (verificationCode.length < 6) {
                  return;
                }

                verifyEmail(
                  { code: verificationCode },
                  {
                    onSuccess: () => {
                      updateUser(
                        { isOnboarded: true },
                        {
                          onSuccess: () => {
                            router.push("/app");
                          },
                        },
                      );
                    },
                  },
                );
              }}
            >
              {t("verify-code")}
            </Button>

            <div className="text-sm">
              <span>{t("didnt-receive-code")} </span>
              <Link
                href="#"
                className="underline"
                onClick={async () => {
                  await resendVerificationEmail();
                }}
              >
                {t("resend-code")}
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
