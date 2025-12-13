package com.starters.board.board.util;

import com.starters.board.board.dto.response.GetPostResponse;
import com.starters.board.board.model.Post;
import com.starters.board.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {

  @Mapping(target = "boardId", source = "post.board.id")
  public GetPostResponse toGetPostResponse(Post post);

  GetPostResponse.Author toGetPostResponseAuthor(User author);
}
