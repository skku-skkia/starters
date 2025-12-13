package com.starters.board.board.repository;

import com.starters.board.board.model.Post;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

  @Override
  @EntityGraph(attributePaths = {"author"})
  public Optional<Post> findById(Long id);

  public Page<Post> findByBoardId(Long boardId, Pageable pageable);
}
