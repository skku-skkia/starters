package com.skkia.board.dto.request;

public record UpdatePostRequest(
    String title, String content, Boolean isPublic, Boolean isCommentingAllowed) {}
