import BoardList from "./_components/BoardList";
import CreateBoardButton from "./_components/CreateBoardButton";
import CreatePostButton from "./_components/CreatePostButton";
import UserList from "./_components/UserList";

export default function Admin() {
  return (
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
  );
}
