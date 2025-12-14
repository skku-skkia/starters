package com.starters.board.common.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handle(Exception e, HttpServletRequest request) {
    log.error(request.getMethod(), request.getRequestURI(), e);

    return ResponseEntity.internalServerError()
        .body(new ErrorResponse("INTERNAL_SERVER_ERROR", "An unexpected error occurred."));
  }
}
