package com.starters.board.common.auth.service;

import com.starters.board.common.auth.dto.UserPrincipal;
import java.util.function.Supplier;
import org.jspecify.annotations.Nullable;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Service;

@Service
public class UserVerificationAuthorizationManager
    implements AuthorizationManager<RequestAuthorizationContext> {

  @Override
  public @Nullable AuthorizationResult authorize(
      Supplier<? extends @Nullable Authentication> authenticationSupplier,
      RequestAuthorizationContext object) {
    Authentication authentication = authenticationSupplier.get();
    if (authentication != null
        && authentication.isAuthenticated()
        && authentication.getPrincipal() instanceof UserPrincipal principal
        && principal.isVerified()) {
      return new AuthorizationDecision(true);
    }

    return new AuthorizationDecision(false);
  }
}
