"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useComments } from "@/features/comment/api/get-comments";
import { usePost } from "@/features/post/api/get-post";
import logger from "@/lib/logger";
import { getQueryClient } from "@/lib/query";
import { getStompClient } from "@/lib/socket";
import { Comment } from "@/types/board";
import { Client } from "@stomp/stompjs";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface PostCommentsProps {
  id: string;
}

export default function PostComments({ id }: PostCommentsProps) {
  const t = useTranslations("pages.post.comments");

  const client = useRef<Client | null>(null);

  const queryClient = getQueryClient();
  const { data: post } = usePost({ id });
  const { data: comments } = useComments({ postId: id });

  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (!post || !post.isCommentingAllowed) {
      return;
    }

    if (!client.current) {
      client.current = getStompClient();
    }

    client.current.activate();

    client.current.onConnect = () => {
      logger.debug(`Connected to WebSocket for post ${id}`);

      client.current?.subscribe(`/topic/posts/${id}/comments`, (message) => {
        queryClient.setQueryData(
          ["posts", id, "comments"],
          (oldData: Comment[]) => {
            const newComment = JSON.parse(message.body);
            return oldData ? [...oldData, newComment] : [newComment];
          },
        );
      });
    };

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, [client, id, post, queryClient]);

  const onSendButtonClick = () => {
    if (commentInput.trim() === "") {
      return;
    }

    if (!client.current) {
      logger.debug("WebSocket client not initialized");
      toast.error("Unable to send comment. Please try again later.");
      return;
    }

    client.current.publish({
      destination: `/app/posts/${id}/comments`,
      body: JSON.stringify({ content: commentInput }),
    });

    setCommentInput("");
  };

  if (!post) {
    return null;
  }

  if (!post.isCommentingAllowed) {
    return (
      <div className="text-center py-4">
        <h1>{t("disabled")}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{t("title")}</h1>

      <ScrollArea className="h-80">
        {comments?.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 py-2">
            <div>
              <span className="font-semibold">{comment.author.username}</span>
            </div>
            <p className="text-sm">{comment.content}</p>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </ScrollArea>

      <div className="flex gap-2 items-center">
        <Input
          placeholder={t("add-comment.placeholder")}
          value={commentInput}
          onChange={(event) => {
            setCommentInput(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSendButtonClick();
            }
          }}
        />
        <Button
          variant="ghost"
          className="border-1 rounded-full h-10 w-10"
          onClick={onSendButtonClick}
        >
          <Icon icon="send" />
        </Button>
      </div>
    </div>
  );
}
