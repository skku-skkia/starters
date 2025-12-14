package com.skkia.board.service;

import com.skkia.board.dto.request.CreateCommentRequest;
import com.skkia.board.dto.response.CreateCommentResponse;
import com.skkia.board.dto.response.GetCommentResponse;
import com.skkia.board.model.Comment;
import com.skkia.board.model.Post;
import com.skkia.board.repository.CommentRepository;
import com.skkia.board.util.CommentMapper;
import com.skkia.user.model.User;
import com.skkia.user.service.UserService;
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
