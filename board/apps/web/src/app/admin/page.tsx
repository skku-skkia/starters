import BoardList from "./_components/BoardList";
import CreateBoardButton from "./_components/CreateBoardButton";
import CreatePostButton from "./_components/CreatePostButton";
import UserList from "./_components/UserList";
import ProfileDropdown from "@/features/user/components/ProfileDropdown";
import AuthProvider from "@/components/provider/AuthProvider";
import { Spinner } from "@/components/ui/spinner";

export default async function Admin() {
  return (
    <AuthProvider isProtected isAdminOnly render={<Spinner />}>
      <header>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl pb-5">Admin Panel</h1>
          <ProfileDropdown />
        </div>
      </header>
      <main>
        <div>
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl">Users</h1>
            </div>

            <UserList />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl">Boards</h1>

              <div className="flex items-center gap-2">
                <CreatePostButton />
                <CreateBoardButton />
              </div>
            </div>

            <BoardList />
          </div>
        </div>
      </main>
    </AuthProvider>
  );
}
