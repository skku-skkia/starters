import { Icon } from "@/components/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import PostComments from "./_components/PostComments";
import PostTitle from "./_components/PostTitle";
import PostContent from "./_components/PostContent";

interface PostProps {
  params: Promise<{ id: string }>;
}

export default async function Post({ params }: PostProps) {
  const { id } = await params;
  const t = await getTranslations();

  return (
    <div className="h-full flex flex-col p-4">
      <Link href="/app" className="flex items-center gap-1 text-sm ">
        <Icon icon="arrow-left" />
        <span>{t("pages.post.back-to-posts")}</span>
      </Link>

      <div className="mt-4 grow">
        <div className="mb-4">
          <PostTitle id={id} />
        </div>

        <div className="grow-2">
          <PostContent id={id} />
        </div>

        <PostComments id={id} />
      </div>
    </div>
  );
}
