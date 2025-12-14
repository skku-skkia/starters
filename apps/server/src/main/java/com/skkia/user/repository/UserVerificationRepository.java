package com.skkia.user.repository;

import com.skkia.user.model.User;
import com.skkia.user.model.UserVerification;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserVerificationRepository extends JpaRepository<UserVerification, Long> {

  public Optional<UserVerification> findByUser(User user);
}
