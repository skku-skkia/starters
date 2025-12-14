package com.skkia.user.util;

import com.skkia.common.auth.dto.UserPrincipal;
import com.skkia.user.dto.response.GetUserResponse;
import com.skkia.user.dto.response.GetViewerResponse;
import com.skkia.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

  public UserPrincipal toUserPrincipal(User user);

  @Mapping(target = "oAuthConnections", source = "OAuthConnections")
  public GetViewerResponse toGetViewerResponse(User user);

  public GetUserResponse toGetUserResponse(User user);
}
