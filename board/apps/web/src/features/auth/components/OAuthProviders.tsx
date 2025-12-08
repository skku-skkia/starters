import { Icon } from "@/components/ui/icon";

export default function OAuthProviders() {
  return (
    <div className="flex gap-4 w-full justify-center items-center">
      <Icon icon="google" size="lg" />
      <Icon icon="naver" size="lg" />
    </div>
  );
}
