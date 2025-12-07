package com.starters.board.user.dto;

import com.starters.board.user.constant.OAuthProvider;

public record OAuthUserDto(OAuthProvider provider, String email, String name) {}
