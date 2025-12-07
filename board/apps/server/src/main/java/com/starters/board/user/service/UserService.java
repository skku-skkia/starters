package com.starters.board.user.service;

import com.starters.board.common.auth.dto.UserPrincipal;
import com.starters.board.user.constant.Role;
import com.starters.board.user.dto.OAuthUserDto;
import com.starters.board.user.dto.request.RegisterRequest;
import com.starters.board.user.dto.request.UpdateUserRequest;
import com.starters.board.user.dto.response.GetViewerResponse;
import com.starters.board.user.model.OAuthUser;
import com.starters.board.user.model.User;
import com.starters.board.user.repository.UserRepository;
import com.starters.board.user.util.UserMapper;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;

  public UserService(
      UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  @Transactional(readOnly = true)
  public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
    User user =
        userRepository
            .findByEmail(username)
            .orElseThrow(
                () -> new UsernameNotFoundException("User not found with username: " + username));

    return userMapper.toUserPrincipal(user);
  }

  @Transactional(readOnly = true)
  public GetViewerResponse getViewer(String userId) {
    User user = userRepository.findById(userId).orElseThrow();
    return userMapper.toGetViewerResponse(user);
  }

  @Transactional
  public User registerUser(RegisterRequest request) {
    Role role = (userRepository.count() == 0) ? Role.ADMIN : Role.USER;
    String encodedPassword = passwordEncoder.encode(request.password());

    User user =
        User.builder()
            .role(role)
            .email(request.email())
            .username(request.username())
            .password(encodedPassword)
            .build();

    user = userRepository.save(user);
    log.debug("{} user registered with email {}", role.name(), user.getEmail());

    return user;
  }

  @Transactional
  public UserPrincipal getOrRegisterOAuthUser(OAuthUserDto oAuthUser) {
    Optional<User> existingUser = userRepository.findByEmail(oAuthUser.email());

    User user;
    if (existingUser.isPresent()) {
      user = existingUser.get();
    } else {
      user = registerUser(new RegisterRequest(oAuthUser.email(), oAuthUser.name(), null));
    }

    if (user.getOAuthConnections().stream()
        .noneMatch(c -> c.getProvider() == oAuthUser.provider())) {
      user.addOAuthConnection(
          OAuthUser.builder().user(user).provider(oAuthUser.provider()).build());
    }

    user = userRepository.save(user);

    return userMapper.toUserPrincipal(user);
  }

  @Transactional
  public void updateUser(String userId, UpdateUserRequest request) {
    User user = userRepository.findById(userId).orElseThrow();

    if (request.username() != null) {
      user.setUsername(request.username());
    }

    if (request.isOnboarded() == true) {
      user.onboard();
    }

    userRepository.save(user);
  }
}
