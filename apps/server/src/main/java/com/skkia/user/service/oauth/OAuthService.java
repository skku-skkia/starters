package com.skkia.user.service.oauth;

import com.skkia.user.constant.OAuthProvider;
import com.skkia.user.dto.OAuthUserDto;
import com.skkia.user.service.UserService;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class OAuthService extends DefaultOAuth2UserService {

  private final UserService userService;
  private final Map<OAuthProvider, OAuthProviderService> providers;

  public OAuthService(UserService userService, List<OAuthProviderService> providers) {
    this.userService = userService;
    this.providers =
        providers.stream()
            .collect(Collectors.toMap(OAuthProviderService::getOAuthProvider, Function.identity()));
  }

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    String registrationId = userRequest.getClientRegistration().getRegistrationId();
    OAuthProvider provider = OAuthProvider.from(registrationId);

    OAuthProviderService providerService = providers.get(provider);
    if (providerService == null) {
      throw new NotImplementedException(
          "OAuthProviderService not implemented for provider: " + provider);
    }

    OAuth2User oAuth2User = super.loadUser(userRequest);
    OAuthUserDto user = providerService.extractUserInfo(oAuth2User);

    return userService.getOrRegisterOAuthUser(user);
  }
}
