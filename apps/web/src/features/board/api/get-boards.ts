import server from "@/lib/server";
import { Board } from "@/types/board";
import { useQuery } from "@tanstack/react-query";

async function getBoards() {
  return server.get<Board[]>("boards").json();
}

function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });
}

export { getBoards, useBoards };
