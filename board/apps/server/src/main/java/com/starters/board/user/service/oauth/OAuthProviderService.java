package com.starters.board.user.service.oauth;

import com.starters.board.user.constant.OAuthProvider;
import com.starters.board.user.dto.OAuthUserDto;
import org.springframework.security.oauth2.core.user.OAuth2User;

interface OAuthProviderService {

  OAuthProvider getOAuthProvider();

  OAuthUserDto extractUserInfo(OAuth2User user);
}
