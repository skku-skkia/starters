import BoardList from "./_components/BoardList";

export default function App() {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex gap-2 py-2 border-b mb-4">
        <BoardList />
      </div>
    </div>
  );
}
