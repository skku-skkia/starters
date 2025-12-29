import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SKKIA - About",
};

export default async function About() {
  const t = await getTranslations("pages.about");

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 backdrop-blur border-b border-border z-50">
        <div className="flex items-center justify-between h-16 max-w-4xl mx-auto px-4">
          <div>
            <Logo />
          </div>

          <nav className="flex items-center gap-4">
            <Link className="hover:underline" href="#">
              {t("navigation.apply")}
            </Link>
            <Link className="hover:underline" href="/app">
              {t("navigation.projects")}
            </Link>
            <Link className="hover:underline" href="#">
              {t("navigation.members")}
            </Link>
            <Link className="hover:underline" href="#">
              {t("navigation.contact")}
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <section className="pt-24">
          <div>
            <h1 className="font-extrabold text-4xl text-center">
              Sungkyunkwan Innovators Association
            </h1>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mt-12">
            <Button size="lg">{t("apply.title")}</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
