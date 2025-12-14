package com.skkia.board.dto.response;

import java.time.Instant;

public record GetCommentResponse(
    Long id, String content, Long postId, Author author, Instant createdAt) {

  public static record Author(String id, String email, String username) {}
}
