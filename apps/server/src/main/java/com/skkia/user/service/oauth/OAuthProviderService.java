package com.skkia.user.service.oauth;

import com.skkia.user.constant.OAuthProvider;
import com.skkia.user.dto.OAuthUserDto;
import org.springframework.security.oauth2.core.user.OAuth2User;

interface OAuthProviderService {

  OAuthProvider getOAuthProvider();

  OAuthUserDto extractUserInfo(OAuth2User user);
}
