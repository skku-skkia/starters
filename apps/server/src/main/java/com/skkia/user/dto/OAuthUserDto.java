package com.skkia.user.dto;

import com.skkia.user.constant.OAuthProvider;

public record OAuthUserDto(OAuthProvider provider, String email, String name) {}
