package com.skkia.user.repository;

import com.skkia.user.constant.Role;
import com.skkia.user.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

  @Override
  @EntityGraph(attributePaths = {"oAuthConnections"})
  public Optional<User> findById(String id);

  @EntityGraph(attributePaths = {"oAuthConnections"})
  public Optional<User> findByEmail(String email);

  public List<User> findByRole(Role role);
}
