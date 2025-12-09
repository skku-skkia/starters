import { getViewer } from "@/features/user/api/get-viewer";
import ProfileDropdown from "@/features/user/components/ProfileDropdown";
import { handleAppError } from "@/lib/error";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await getViewer()
    .then((user) => {
      if (user.role !== "ADMIN") {
        redirect("/app");
      }
    })
    .catch((error) => {
      handleAppError(error);
    });

  return (
    <div className="p-10">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl pb-5">Admin Panel</h1>
        <ProfileDropdown />
      </header>
      <main>{children}</main>
    </div>
  );
}
