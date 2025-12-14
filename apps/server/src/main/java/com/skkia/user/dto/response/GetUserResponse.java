package com.skkia.user.dto.response;

import com.skkia.user.constant.Role;

public record GetUserResponse(String id, String email, String username, Role role) {}
