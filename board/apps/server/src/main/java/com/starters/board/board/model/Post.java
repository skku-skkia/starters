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
@Table(name = "posts")
@Getter
public class Post extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "author_id", nullable = false)
  private @Nullable User author;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "board_id", nullable = false)
  private @Nullable Board board;

  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "content", nullable = false, columnDefinition = "TEXT")
  private String content;

  @Column(name = "likes", nullable = false)
  private Long likes;

  @Column(name = "is_public", nullable = false)
  private Boolean isPublic;

  @Column(name = "is_commenting_allowed", nullable = false)
  private Boolean isCommentingAllowed = true;

  protected Post() {}

  @Builder
  public Post(
      User author,
      Board board,
      String title,
      String content,
      Boolean isPublic,
      Boolean isCommentingAllowed) {
    this.author = author;
    this.board = board;
    this.title = title;
    this.content = content;
    this.likes = 0L;
    this.isPublic = isPublic;
    this.isCommentingAllowed = isCommentingAllowed;
  }

  public static Post reference(Long id) {
    Post post = new Post();
    post.id = id;
    return post;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public void setIsPublic(Boolean isPublic) {
    this.isPublic = isPublic;
  }

  public void setIsCommentingAllowed(Boolean isCommentingAllowed) {
    this.isCommentingAllowed = isCommentingAllowed;
  }
}
