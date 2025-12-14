import { create } from "zustand";
import { ssr } from ".";

type BoardState = {
  selectedBoardId: number | null;
};

type BoardActions = {
  setSelectedBoardId: (boardId: number) => void;
};

type BoardStore = BoardState & {
  actions: BoardActions;
};

const defaultInitialState: BoardState = {
  selectedBoardId: null,
};

const useBoardStore = create<BoardStore>(
  ssr((set) => ({
    ...defaultInitialState,
    actions: {
      setSelectedBoardId: (boardId: number) =>
        set(() => ({ selectedBoardId: boardId })),
    },
  })),
);

export const useSelectedBoardId = () =>
  useBoardStore((state) => state.selectedBoardId);

export const useBoardStoreActions = () =>
  useBoardStore((state) => state.actions);
