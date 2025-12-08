"use client";

import { cn } from "@/lib/utils";
import { useBoards } from "@/features/board/api/get-boards";
import { useEffect } from "react";
import { useBoardStoreActions, useSelectedBoardId } from "@/store/board";

export default function BoardList() {
  const { data: boards } = useBoards();
  const selectedBoardId = useSelectedBoardId();
  const { setSelectedBoardId } = useBoardStoreActions();

  useEffect(() => {
    if (selectedBoardId === null && boards && boards.length > 0) {
      setSelectedBoardId(boards[0]!.id);
    }
  }, [boards, selectedBoardId, setSelectedBoardId]);

  return (
    <>
      {boards ? (
        boards.map((board, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              onClick={() => {
                setSelectedBoardId(board.id);
              }}
              className={cn(
                "rounded-full bg-accent flex items-center justify-center m-2 inline-block border-2",
                selectedBoardId === board.id
                  ? "border-primary"
                  : "border-transparent",
              )}
            >
              <div className="w-[40px] h-[40px] p-1 flex items-center justify-center">
                {board.icon}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Loading boards...</div>
      )}
    </>
  );
}
