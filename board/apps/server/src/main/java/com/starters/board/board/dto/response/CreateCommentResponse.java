package com.starters.board.board.dto.response;

import java.time.Instant;

public record CreateCommentResponse(
    Long id, String content, Long postId, Author author, Instant createdAt) {

  public static record Author(String id, String email, String username) {}
}
