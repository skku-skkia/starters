package com.starters.board.board.dto.response;

import java.time.Instant;

public record GetPostResponse(
    Long id,
    String title,
    String content,
    String authorId,
    long boardId,
    long likes,
    boolean isPublic,
    boolean isCommentingAllowed,
    Instant createdAt) {}
