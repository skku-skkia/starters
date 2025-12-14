package com.skkia.user.controller;

import com.skkia.common.auth.dto.UserPrincipal;
import com.skkia.user.dto.request.UpdateUserRequest;
import com.skkia.user.dto.response.GetUserResponse;
import com.skkia.user.dto.response.GetViewerResponse;
import com.skkia.user.service.UserService;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/users/admins")
  public List<GetUserResponse> getAdmins() {
    return userService.getAdmins();
  }

  @GetMapping("/users/me")
  public GetViewerResponse getViewer(@AuthenticationPrincipal UserPrincipal user) {
    return userService.getViewer(user.id());
  }

  @PatchMapping("/users/me")
  public void updateViewer(
      @AuthenticationPrincipal UserPrincipal user, @RequestBody UpdateUserRequest request) {
    userService.updateUser(user.id(), request);
  }
}
