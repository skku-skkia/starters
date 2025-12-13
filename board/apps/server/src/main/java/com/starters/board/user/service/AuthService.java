package com.starters.board.user.service;

import com.starters.board.common.auth.dto.UserPrincipal;
import com.starters.board.user.dto.request.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

  private final UserService userService;
  private final AuthenticationManager authenticationManager;

  public AuthService(UserService userService, AuthenticationManager authenticationManager) {
    this.userService = userService;
    this.authenticationManager = authenticationManager;
  }

  @Transactional(readOnly = true)
  public Authentication authenticate(LoginRequest request) {
    UserPrincipal principal = userService.loadUserByUsername(request.email());
    if (principal.password() == null) {
      throw new IllegalArgumentException(
          "User has no password set, user can only login via OAuth.");
    }

    Authentication authentication =
        UsernamePasswordAuthenticationToken.authenticated(
            principal, request.password(), principal.getAuthorities());
    authenticationManager.authenticate(authentication);

    return authentication;
  }

  @Transactional(readOnly = true)
  public Authentication refresh(String userId) {
    UserPrincipal principal = userService.loadUserById(userId);

    return UsernamePasswordAuthenticationToken.authenticated(
        principal, principal.password(), principal.getAuthorities());
  }
}
