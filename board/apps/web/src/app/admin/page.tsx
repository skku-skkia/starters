import BoardList from "./_components/BoardList";
import CreateBoardButton from "./_components/CreateBoardButton";

export default function Admin() {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl">Boards</h1>

          <div>
            <CreateBoardButton />
          </div>
        </div>

        <BoardList />
      </div>
    </div>
  );
}
