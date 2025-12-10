package com.starters.board.user.util;

import com.starters.board.common.auth.dto.UserPrincipal;
import com.starters.board.user.dto.response.GetUserResponse;
import com.starters.board.user.dto.response.GetViewerResponse;
import com.starters.board.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

  public UserPrincipal toUserPrincipal(User user);

  @Mapping(target = "oAuthConnections", source = "OAuthConnections")
  public GetViewerResponse toGetViewerResponse(User user);

  public GetUserResponse toGetUserResponse(User user);
}
