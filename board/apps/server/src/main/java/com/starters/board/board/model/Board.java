package com.starters.board.board.model;

import com.starters.board.common.entity.BaseEntity;
import com.starters.board.user.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import org.jspecify.annotations.Nullable;

@Entity
@Table(name = "boards")
@Getter
public class Board extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "creator_id", nullable = false)
  private @Nullable User creator;

  @Column(name = "icon", nullable = false, length = 16)
  private String icon;

  @Column(name = "title", nullable = false, length = 255)
  private String title;

  @Column(name = "description", nullable = false, length = 1024)
  private String description;

  protected Board() {}

  @Builder
  public Board(User creator, String icon, String title, String description) {
    this.creator = creator;
    this.icon = icon;
    this.title = title;
    this.description = description;
  }
}
