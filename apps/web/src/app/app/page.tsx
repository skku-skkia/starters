"use client";

import AuthProvider from "@/components/provider/AuthProvider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useBoards } from "@/features/board/api/get-boards";
import { usePosts } from "@/features/post/api/get-posts";
import { useSelectedBoardId } from "@/store/board";
import Link from "next/link";
import { useState } from "react";
import BoardList from "./_components/BoardList";

export default function App() {
  const selectedBoardId = useSelectedBoardId();
  const [page, setPage] = useState(0);

  const { data: boards } = useBoards();
  const { data: posts } = usePosts(
    {
      boardId: selectedBoardId || 0,
      page,
      size: 10,
    },
    {
      enabled: !!selectedBoardId,
    },
  );

  const board = boards?.find((b) => b.id === selectedBoardId);

  return (
    <AuthProvider>
      <div className="flex gap-2 py-2 border-b mb-4">
        <BoardList />
      </div>

      <div className="flex flex-col h-full pb-4">
        <div>
          <h1 className="text-xl">{board ? board.title : "Select a board"}</h1>
          <span>
            {board ? board.description : "Please select a board to view posts."}
          </span>
        </div>

        <div className="grow">
          {posts &&
            posts.content.map((post) => (
              <Link key={post.id} href={`/app/post/${post.id}`}>
                <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                </div>
              </Link>
            ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  setPage((page) => (page === 0 ? 0 : page - 1));
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">{page + 1}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setPage((page) =>
                    posts && (page + 1) * 10 < posts.page.totalElements
                      ? page + 1
                      : page,
                  )
                }
                isActive={posts && (page + 1) * 10 < posts.page.totalElements}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AuthProvider>
  );
}
