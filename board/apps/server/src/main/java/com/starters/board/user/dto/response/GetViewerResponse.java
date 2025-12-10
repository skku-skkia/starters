package com.starters.board.user.dto.response;

import com.starters.board.user.constant.OAuthProvider;
import com.starters.board.user.constant.Role;
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
