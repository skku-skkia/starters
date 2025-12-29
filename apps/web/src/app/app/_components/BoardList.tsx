"use client";

import { cn } from "@/lib/utils";
import { useBoards } from "@/features/board/api/get-boards";
import { useEffect } from "react";
import { useBoardStoreActions, useSelectedBoardId } from "@/store/board";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

export default function BoardList() {
  const t = useTranslations("pages.home");

  const { data: boards } = useBoards();
  const selectedBoardId = useSelectedBoardId();
  const { setSelectedBoardId } = useBoardStoreActions();

  useEffect(() => {
    if (selectedBoardId === null && boards && boards.length > 0) {
      setSelectedBoardId(boards[0]!.id);
    }
  }, [boards, selectedBoardId, setSelectedBoardId]);

  if (!boards || boards.length === 0) {
    return (
      <div className="w-full flex items-center justify-center">
        {boards === undefined ? <Spinner /> : t("boards.no-boards")}
      </div>
    );
  }

  return (
    <>
      {boards.map((board, index) => (
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
      ))}
    </>
  );
}
