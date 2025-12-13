package com.starters.board.user.repository;

import com.starters.board.user.model.User;
import com.starters.board.user.model.UserVerification;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserVerificationRepository extends JpaRepository<UserVerification, Long> {

  public Optional<UserVerification> findByUser(User user);
}
