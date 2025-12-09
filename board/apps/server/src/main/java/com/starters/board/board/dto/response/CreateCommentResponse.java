package com.starters.board.board.dto.response;

import java.time.Instant;

public record CreateCommentResponse(
    Long id, String content, Long postId, String authorId, Instant createdAt) {}
