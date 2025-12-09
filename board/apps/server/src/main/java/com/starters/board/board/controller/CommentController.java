package com.starters.board.board.controller;

import com.starters.board.board.dto.response.GetCommentResponse;
import com.starters.board.board.service.CommentService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommentController {

  private final CommentService commentService;

  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @GetMapping("/posts/{postId}/comments")
  public List<GetCommentResponse> getComments(@PathVariable Long postId) {
    return commentService.getComments(postId);
  }
}
