package com.skkia.common.email.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

  private final String from;

  private final JavaMailSender javaMailSender;

  public EmailService(
      @Value("${spring.mail.username}") String from, JavaMailSender javaMailSender) {
    this.from = from;
    this.javaMailSender = javaMailSender;
  }

  @Async
  @Retryable(
      retryFor = {MessagingException.class, MailException.class},
      backoff = @Backoff(delay = 3000),
      maxAttempts = 3)
  public void send(String title, String to, String content) throws MessagingException {
    MimeMessage message = javaMailSender.createMimeMessage();

    message.setFrom(from);
    message.addRecipients(MimeMessage.RecipientType.TO, to);
    message.setText(content, "utf-8", "html");

    message.setSubject(title);

    javaMailSender.send(message);
  }
}
