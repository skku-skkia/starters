package com.starters.board.board.util;

import com.starters.board.board.dto.response.GetPostResponse;
import com.starters.board.board.model.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface PostMapper {

  @Mappings({
    @Mapping(target = "authorId", source = "post.author.id"),
    @Mapping(target = "boardId", source = "post.board.id"),
  })
  public GetPostResponse toGetPostResponse(Post post);
}
