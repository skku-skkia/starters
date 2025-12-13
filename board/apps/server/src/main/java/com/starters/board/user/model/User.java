package com.starters.board.user.model;

import com.starters.board.common.entity.BaseEntity;
import com.starters.board.user.constant.Role;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.jspecify.annotations.Nullable;

@Entity
@Table(name = "users")
@Getter
@SQLDelete(sql = "UPDATE user SET deleted_at = NOW() WHERE id = ?")
public class User extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id")
  private String id;

  @Enumerated(EnumType.STRING)
  @Column(name = "role", nullable = false)
  @Setter
  private Role role;

  @Column(name = "email", nullable = false, unique = true, length = 255)
  private String email;

  @Column(name = "username", nullable = false, length = 255)
  @Setter
  private String username;

  @Column(name = "password", nullable = true, length = 255)
  private @Nullable String password;

  @OneToMany(mappedBy = "user", cascade = CascadeType.MERGE, orphanRemoval = true)
  private List<OAuthUser> oAuthConnections;

  @Column(name = "is_onboarded", nullable = false)
  private Boolean isOnboarded = false;

  @Column(name = "is_verified", nullable = false)
  private Boolean isVerified = false;

  @Column(name = "deleted_at", nullable = true)
  private @Nullable Instant deletedAt;

  protected User() {
    this.oAuthConnections = new ArrayList<>();
  }

  public static User reference(String id) {
    User user = new User();
    user.id = id;
    return user;
  }

  @Builder
  public User(Role role, String email, String username, @Nullable String password) {
    this.role = role;
    this.email = email;
    this.username = username;
    this.password = password;
    this.oAuthConnections = new ArrayList<>();
  }

  public void onboard() {
    this.isOnboarded = true;
  }

  public void addOAuthConnection(OAuthUser connection) {
    this.oAuthConnections.add(connection);
  }

  public void verifyEmail() {
    this.isVerified = true;
  }
}
