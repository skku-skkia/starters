package com.skkia.user.service.oauth;

import com.skkia.user.constant.OAuthProvider;
import com.skkia.user.dto.OAuthUserDto;
import org.jspecify.annotations.Nullable;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
class NaverOAuthService implements OAuthProviderService {

  private final ObjectMapper objectMapper;

  public NaverOAuthService(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @Override
  public OAuthProvider getOAuthProvider() {
    return OAuthProvider.NAVER;
  }

  @Override
  public OAuthUserDto extractUserInfo(OAuth2User user) {
    @Nullable NaverResponse response =
        objectMapper.convertValue(user.getAttribute("response"), NaverResponse.class);

    return new OAuthUserDto(getOAuthProvider(), response.email(), response.name());
  }

  private static record NaverResponse(String id, String email, String name) {}
}
