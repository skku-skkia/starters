package com.starters.board.user.constant;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
  ADMIN("ROLE_ADMIN"),
  USER("ROLE_USER");

  private final String authority;

  Role(String authority) {
    this.authority = authority;
  }

  @Override
  public @Nullable String getAuthority() {
    return authority;
  }

  public static final String ADMIN_ROLE = "ROLE_ADMIN";
}
