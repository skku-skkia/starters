package com.starters.board.user.dto.request;

import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
    @NotNull String email, @NotNull String username, @NotNull String password) {}
