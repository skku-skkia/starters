package com.skkia.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.Builder;
import lombok.Getter;

@Entity
@Table(name = "user_verifications")
@Getter
public class UserVerification {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false, unique = true)
  private User user;

  @Column(name = "code", nullable = false, unique = true, length = 64)
  private String code;

  @Column(name = "expiration_time", nullable = false)
  private Instant expirationTime;

  protected UserVerification() {}

  @Builder
  public UserVerification(User user, String code, Instant expirationTime) {
    this.user = user;
    this.code = code;
    this.expirationTime = expirationTime;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public void setExpirationTime(Instant expirationTime) {
    this.expirationTime = expirationTime;
  }
}
