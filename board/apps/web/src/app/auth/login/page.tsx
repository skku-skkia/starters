import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/features/auth/components/LoginForm";
import OAuthProviders from "@/features/auth/components/OAuthProviders";
import { useTranslations } from "next-intl";

export default function Login() {
  const t = useTranslations("pages.login");

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
        <Separator className="my-3" />
        <OAuthProviders />
      </CardContent>
    </Card>
  );
}
