package com.skkia.board.util;

import com.skkia.board.dto.response.GetPostResponse;
import com.skkia.board.model.Post;
import com.skkia.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {

  @Mapping(target = "boardId", source = "post.board.id")
  public GetPostResponse toGetPostResponse(Post post);

  GetPostResponse.Author toGetPostResponseAuthor(User author);
}
