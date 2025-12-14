package com.skkia.board.dto.response;

import java.time.Instant;

public record GetPostResponse(
    Long id,
    String title,
    String content,
    Author author,
    long boardId,
    long likes,
    boolean isPublic,
    boolean isCommentingAllowed,
    Instant createdAt) {

  public static record Author(String id, String email, String username) {}
}
