package com.starters.board.user.dto.response;

import com.starters.board.user.constant.Role;

public record GetUserResponse(String id, String email, String username, Role role) {}
