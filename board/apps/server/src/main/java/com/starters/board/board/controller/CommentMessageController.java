package com.starters.board.board.controller;

import com.starters.board.board.dto.request.CreateCommentRequest;
import com.starters.board.board.dto.response.CreateCommentResponse;
import com.starters.board.board.service.CommentService;
import com.starters.board.common.auth.dto.UserPrincipal;
import java.security.Principal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class CommentMessageController {

  private final CommentService commentService;

  public CommentMessageController(CommentService commentService) {
    this.commentService = commentService;
  }

  @MessageMapping("/posts/{postId}/comments")
  @SendTo("/topic/posts/{postId}/comments")
  public CreateCommentResponse handleCommentMessage(
      Principal principal,
      @DestinationVariable Long postId,
      @Payload CreateCommentRequest request) {
    UserPrincipal user = (UserPrincipal) ((Authentication) principal).getPrincipal();
    if (user == null) {
      throw new IllegalArgumentException("User not found in principal");
    }

    return commentService.createComment(user.id(), postId, request);
  }
}
