import BoardList from "./_components/BoardList";
import ProfileDropdown from "@/features/user/components/ProfileDropdown";
import Logo from "@/components/ui/logo";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-dvh flex flex-col">
      <header className="flex items-center justify-between p-4">
        <Logo />
        <ProfileDropdown />
      </header>

      <main className="grow p-4 flex flex-col">
        <div className="flex gap-2 py-2 border-b mb-4">
          <BoardList />
        </div>

        {children}
      </main>
    </div>
  );
}
