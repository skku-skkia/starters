package com.skkia.user.constant;

import lombok.Getter;

public enum OAuthProvider {
  NAVER("naver");

  @Getter private final String id;

  private OAuthProvider(String id) {
    this.id = id;
  }

  public static OAuthProvider from(String id) {
    for (OAuthProvider provider : values()) {
      if (provider.getId().equals(id)) {
        return provider;
      }
    }

    throw new IllegalArgumentException("Unknown OAuthProvider id: " + id);
  }
}
