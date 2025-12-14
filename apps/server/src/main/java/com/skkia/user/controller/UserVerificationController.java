package com.skkia.user.controller;

import com.skkia.common.auth.dto.UserPrincipal;
import com.skkia.user.dto.request.VerifyEmailRequest;
import com.skkia.user.service.AuthService;
import com.skkia.user.service.UserVerificationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserVerificationController {

  private final UserVerificationService userVerificationService;
  private final AuthService authService;

  public UserVerificationController(
      UserVerificationService userVerificationService, AuthService authService) {
    this.userVerificationService = userVerificationService;
    this.authService = authService;
  }

  @PostMapping("/verify-email")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void verifyEmail(
      HttpServletRequest http,
      @AuthenticationPrincipal UserPrincipal user,
      VerifyEmailRequest request) {
    userVerificationService.verifyEmail(user.id(), request);

    Authentication authentication = authService.refresh(user.id());
    SecurityContextHolder.getContext().setAuthentication(authentication);

    HttpSession session = http.getSession(true);
    session.setAttribute(
        HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
        SecurityContextHolder.getContext());
  }

  @PostMapping("/verify-email/resend")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void resendVerificationEmail(@AuthenticationPrincipal UserPrincipal user) {
    userVerificationService.sendVerificationEmail(user.id());
  }
}
