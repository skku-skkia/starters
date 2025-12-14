package com.skkia.board.util;

import com.skkia.board.dto.response.CreateCommentResponse;
import com.skkia.board.dto.response.GetCommentResponse;
import com.skkia.board.model.Comment;
import com.skkia.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

  @Mapping(target = "postId", source = "comment.post.id")
  public CreateCommentResponse toCreateCommentResponse(Comment comment);

  CreateCommentResponse.Author toCreateCommentResponseAuthor(User user);

  @Mapping(target = "postId", source = "comment.post.id")
  public GetCommentResponse toGetCommentResponse(Comment comment);

  GetCommentResponse.Author toGetCommentResponseAuthor(User user);
}
