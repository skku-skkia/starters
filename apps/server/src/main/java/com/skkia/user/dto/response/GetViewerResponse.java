package com.skkia.user.dto.response;

import com.skkia.user.constant.OAuthProvider;
import com.skkia.user.constant.Role;
import java.util.List;

public record GetViewerResponse(
    String id,
    String email,
    String username,
    Role role,
    boolean isOnboarded,
    boolean isVerified,
    List<OAuthConnection> oAuthConnections) {

  public static record OAuthConnection(OAuthProvider provider) {}
}
