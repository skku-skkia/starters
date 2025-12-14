package com.skkia.board.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateBoardRequest(
    @NotNull String icon,
    @NotNull @Size(min = 1, max = 50) String title,
    @NotNull String description) {}
