package com.skkia.common.auth.dto;

import com.skkia.user.constant.Role;
import java.util.List;
import java.util.Map;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

public record UserPrincipal(
    String id, Role role, String email, @Nullable String password, boolean isVerified)
    implements UserDetails, OAuth2User {

  @Override
  public String getName() {
    return email;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public @Nullable String getPassword() {
    return password;
  }

  @Override
  public List<Role> getAuthorities() {
    return List.of(role);
  }

  @Override
  public Map<String, Object> getAttributes() {
    return Map.of();
  }
}
