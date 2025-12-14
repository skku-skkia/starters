package com.skkia.user.service;

import com.skkia.common.email.service.EmailService;
import com.skkia.user.dto.event.UserRegisteredEvent;
import com.skkia.user.dto.request.VerifyEmailRequest;
import com.skkia.user.model.User;
import com.skkia.user.model.UserVerification;
import com.skkia.user.repository.UserRepository;
import com.skkia.user.repository.UserVerificationRepository;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@Slf4j
public class UserVerificationService implements ApplicationListener<UserRegisteredEvent> {

  private static final SecureRandom random = new SecureRandom();

  private static final int CODE_LENGTH = 6;
  private static final Duration VERIFICATION_CODE_EXPIRATION_TIME_DURATION = Duration.ofMinutes(15);

  private final UserRepository userRepository;
  private final UserVerificationRepository userVerificationRepository;
  private final EmailService emailService;
  private final SpringTemplateEngine templateEngine;

  public UserVerificationService(
      UserRepository userRepository,
      UserVerificationRepository userVerificationRepository,
      EmailService emailService,
      SpringTemplateEngine templateEngine) {
    this.userRepository = userRepository;
    this.userVerificationRepository = userVerificationRepository;
    this.emailService = emailService;
    this.templateEngine = templateEngine;
  }

  @Transactional
  public void verifyEmail(String userId, VerifyEmailRequest request) {
    User user = userRepository.findById(userId).orElseThrow();
    UserVerification userVerification =
        userVerificationRepository
            .findByUser(user)
            .orElseThrow(() -> new IllegalArgumentException("Invalid verification code."));

    if (userVerification.getExpirationTime().isBefore(Instant.now())) {
      throw new IllegalArgumentException("Verification code has expired.");
    }

    user.verifyEmail();
    userRepository.save(user);

    userVerificationRepository.delete(userVerification);
  }

  @Transactional
  public void sendVerificationEmail(String userId) {
    User user = userRepository.findById(userId).orElseThrow();
    String code = generateCode(CODE_LENGTH);

    UserVerification userVerification =
        userVerificationRepository
            .findByUser(user)
            .orElseGet(() -> UserVerification.builder().user(user).build());
    userVerification.setCode(code);
    userVerification.setExpirationTime(
        Instant.now().plus(VERIFICATION_CODE_EXPIRATION_TIME_DURATION));

    userVerificationRepository.save(userVerification);

    String title = "Please verify your email address";

    Context context = new Context();
    context.setVariable("username", user.getUsername());
    context.setVariable("code", code);
    context.setVariable("expiration", userVerification.getExpirationTime());

    try {
      emailService.send(
          title, user.getEmail(), templateEngine.process("email/verification-email", context));
    } catch (Exception e) {
      log.error("Failed to send verification email to {}", user.getEmail(), e);
      throw new RuntimeException("Failed to send verification email.");
    }
  }

  @Override
  public void onApplicationEvent(UserRegisteredEvent event) {
    log.debug("Handling user registered event for user {}", event.getUserId());
    sendVerificationEmail(event.getUserId());
  }

  private static final String CHARACTERS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  private static String generateCode(int length) {
    StringBuilder sb = new StringBuilder(length);
    for (int i = 0; i < length; i++) {
      int index = random.nextInt(CHARACTERS.length());
      sb.append(CHARACTERS.charAt(index));
    }

    return sb.toString();
  }
}
