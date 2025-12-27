package com.skkia.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

@TestConfiguration
@Testcontainers
public class TestcontainersConfig {

  @Container
  private static final PostgreSQLContainer postgresContainer =
      new PostgreSQLContainer(DockerImageName.parse("postgres:18-alpine"));

  @Bean
  @ServiceConnection
  PostgreSQLContainer postgresContainer() {
    return postgresContainer;
  }
}
