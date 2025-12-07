package com.starters.board.user.repository;

import com.starters.board.user.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

  public Optional<User> findByEmail(String email);
}
