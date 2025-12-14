package com.skkia.user.model;

import com.skkia.user.constant.OAuthProvider;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

@Entity
@Table(name = "oauth_users")
@Getter
public class OAuthUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Enumerated(EnumType.STRING)
  @Column(name = "provider", nullable = false)
  private OAuthProvider provider;

  protected OAuthUser() {}

  @Builder
  public OAuthUser(User user, OAuthProvider provider) {
    this.user = user;
    this.provider = provider;
  }
}
