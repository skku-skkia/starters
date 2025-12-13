package com.starters.board.board.service;

import com.starters.board.board.dto.request.CreateCommentRequest;
import com.starters.board.board.dto.response.CreateCommentResponse;
import com.starters.board.board.dto.response.GetCommentResponse;
import com.starters.board.board.model.Comment;
import com.starters.board.board.model.Post;
import com.starters.board.board.repository.CommentRepository;
import com.starters.board.board.util.CommentMapper;
import com.starters.board.user.model.User;
import com.starters.board.user.service.UserService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

  private final UserService userService;
  private final CommentRepository commentRepository;
  private final CommentMapper commentMapper;

  public CommentService(
      UserService userService, CommentRepository commentRepository, CommentMapper commentMapper) {
    this.userService = userService;
    this.commentRepository = commentRepository;
    this.commentMapper = commentMapper;
  }

  @Transactional
  public CreateCommentResponse createComment(
      String authorId, Long postId, CreateCommentRequest request) {
    User author = userService.getUserById(authorId);
    Post post = Post.reference(postId);

    Comment comment =
        Comment.builder().author(author).post(post).content(request.content()).build();

    comment = commentRepository.save(comment);
    return commentMapper.toCreateCommentResponse(comment);
  }

  @Transactional(readOnly = true)
  public List<GetCommentResponse> getComments(Long postId) {
    return commentRepository.findAll().stream().map(commentMapper::toGetCommentResponse).toList();
  }
}
