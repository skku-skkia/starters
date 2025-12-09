package com.starters.board.board.service;

import com.starters.board.board.dto.request.CreateCommentRequest;
import com.starters.board.board.dto.response.CreateCommentResponse;
import com.starters.board.board.dto.response.GetCommentResponse;
import com.starters.board.board.model.Comment;
import com.starters.board.board.model.Post;
import com.starters.board.board.repository.CommentRepository;
import com.starters.board.user.model.User;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

  private final CommentRepository commentRepository;

  public CommentService(CommentRepository commentRepository) {
    this.commentRepository = commentRepository;
  }

  @Transactional
  public CreateCommentResponse createComment(
      String authorId, Long postId, CreateCommentRequest request) {
    User author = User.reference(authorId);
    Post post = Post.reference(postId);

    Comment comment =
        Comment.builder().author(author).post(post).content(request.content()).build();

    comment = commentRepository.save(comment);

    return new CreateCommentResponse(
        comment.getId(),
        comment.getContent(),
        comment.getPost().getId(),
        comment.getAuthor().getId(),
        comment.getCreatedAt());
  }

  @Transactional(readOnly = true)
  public List<GetCommentResponse> getComments(Long postId) {
    return commentRepository.findAll().stream()
        .map(
            comment ->
                new GetCommentResponse(
                    comment.getId(),
                    comment.getContent(),
                    comment.getPost().getId(),
                    comment.getAuthor().getId(),
                    comment.getCreatedAt()))
        .toList();
  }
}
