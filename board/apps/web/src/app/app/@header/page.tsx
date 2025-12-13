import AuthProvider from "@/components/provider/AuthProvider";
import Logo from "@/components/ui/logo";
import { Spinner } from "@/components/ui/spinner";
import ProfileDropdown from "@/features/user/components/ProfileDropdown";

export default function AppHeader() {
  return (
    <AuthProvider render={<Spinner />}>
      <div className="flex items-center justify-between p-4">
        <Logo />
        <ProfileDropdown />
      </div>
    </AuthProvider>
  );
}
