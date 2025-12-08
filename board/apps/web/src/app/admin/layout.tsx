import { getViewer } from "@/features/user/api/get-viewer";
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
      <header>
        <h1 className="text-2xl pb-5">Admin Panel</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
