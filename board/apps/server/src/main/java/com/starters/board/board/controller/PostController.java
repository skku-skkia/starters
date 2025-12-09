package com.starters.board.board.controller;

import com.starters.board.board.dto.request.CreatePostRequest;
import com.starters.board.board.dto.request.UpdatePostRequest;
import com.starters.board.board.dto.response.GetPostResponse;
import com.starters.board.board.service.PostService;
import com.starters.board.common.auth.dto.UserPrincipal;
import com.starters.board.user.constant.Role;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
class PostController {

  private final PostService postService;

  public PostController(PostService postService) {
    this.postService = postService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Secured(Role.ADMIN_ROLE)
  public void createPost(
      @AuthenticationPrincipal UserPrincipal user,
      @Validated @RequestBody CreatePostRequest request) {
    postService.createPost(user.id(), request);
  }

  @GetMapping("/{postId}")
  public GetPostResponse getPost(@PathVariable Long postId) {
    return postService.getPost(postId);
  }

  @GetMapping
  public Page<GetPostResponse> getPosts(
      @RequestParam(required = false) @Nullable Long boardId,
      @RequestParam(required = false, defaultValue = "50") int size,
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false) @Nullable String query) {
    return postService.getPosts(boardId, size, page, query);
  }

  @PatchMapping("/{postId}")
  @Secured(Role.ADMIN_ROLE)
  public void updatePost(@PathVariable Long postId, @RequestBody UpdatePostRequest request) {
    postService.updatePost(postId, request);
  }

  @DeleteMapping("/{postId}")
  @Secured(Role.ADMIN_ROLE)
  public void deletePost(@PathVariable Long postId) {
    postService.deletePost(postId);
  }
}
