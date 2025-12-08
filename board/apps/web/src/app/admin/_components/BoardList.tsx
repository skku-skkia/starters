"use client";

import { useBoards } from "@/features/board/api/get-boards";

export default function BoardList() {
  const { data: boards } = useBoards();

  return (
    <div>
      {boards &&
        boards.map((board, index) => {
          return (
            <div key={index} className="mb-4">
              <div className="text-lg font-bold flex items-center gap-2 mb-1">
                <span>{board.icon}</span>
                <span>{board.title}</span>
              </div>

              <div>
                <span>{board.description}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
