package com.starters.board.user.controller;

import com.starters.board.user.dto.request.LoginRequest;
import com.starters.board.user.dto.request.RegisterRequest;
import com.starters.board.user.service.AuthService;
import com.starters.board.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
class AuthController {

  private final AuthService authService;
  private final UserService userService;

  public AuthController(AuthService authService, UserService userService) {
    this.authService = authService;
    this.userService = userService;
  }

  @PostMapping("/auth/login")
  @ResponseStatus(HttpStatus.OK)
  public void login(HttpServletRequest http, @RequestBody @Validated LoginRequest request) {
    Authentication authentication = authService.authenticate(request);

    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
    securityContext.setAuthentication(authentication);
    SecurityContextHolder.setContext(securityContext);

    HttpSession session = http.getSession(true);
    session.setAttribute(
        HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
  }

  @PostMapping("/auth/register")
  public void register(@RequestBody @Validated RegisterRequest request) {
    userService.registerUser(request);
  }
}
