package com.skkia.config;

import com.skkia.common.auth.service.UserVerificationAuthorizationManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(
      HttpSecurity http,
      OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService,
      UserVerificationAuthorizationManager userVerificationAuthorizationManager,
      @Value("oauth2.success.redirect-url") String oauth2SuccessRedirectUrl) {
    return http.authorizeHttpRequests(
            requests -> {
              requests.requestMatchers(HttpMethod.GET, "/boards").permitAll();

              requests.requestMatchers(HttpMethod.POST, "/auth/login").permitAll();
              requests.requestMatchers(HttpMethod.POST, "/auth/register").permitAll();

              requests.requestMatchers(HttpMethod.GET, "/users/me").authenticated();
              requests.requestMatchers(HttpMethod.PATCH, "/users/me").authenticated();

              requests.requestMatchers(HttpMethod.POST, "/verify-email").permitAll();
              requests.requestMatchers(HttpMethod.POST, "/verify-email/resend").authenticated();

              requests.anyRequest().access(userVerificationAuthorizationManager);
            })
        .csrf(csrf -> csrf.disable())
        .formLogin(FormLoginConfigurer::disable)
        .logout(logout -> logout.logoutUrl("/auth/logout").deleteCookies("JSESSIONID"))
        .cors(Customizer.withDefaults())
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
        .oauth2Login(
            oauth ->
                oauth
                    .userInfoEndpoint(user -> user.userService(oAuth2UserService))
                    .successHandler(
                        (request, response, authentication) -> {
                          response.setStatus(HttpStatus.OK.value());
                          response.sendRedirect("http://localhost:3000/auth/oauth2/redirect");
                        }))
        .exceptionHandling(
            exception ->
                exception.authenticationEntryPoint(
                    new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
        .build();
  }

  @Bean
  public AuthenticationManager authenticationManager(
      UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
    DaoAuthenticationProvider authenticationProvider =
        new DaoAuthenticationProvider(userDetailsService);
    authenticationProvider.setPasswordEncoder(passwordEncoder);

    return new ProviderManager(authenticationProvider);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
  }
}
