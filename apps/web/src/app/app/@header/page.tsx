import Logo from "@/components/ui/logo";
import ProfileDropdown from "@/features/user/components/ProfileDropdown";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4">
      <Logo />
      <ProfileDropdown />
    </div>
  );
}
