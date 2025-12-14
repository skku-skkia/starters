package com.skkia.board.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreatePostRequest(
    @NotNull @Size(min = 1, max = 250) String title,
    @NotNull String content,
    @NotNull Long boardId,
    boolean isPublic,
    boolean isCommentingAllowed) {}
