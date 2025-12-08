package com.starters.board.board.controller;

import com.starters.board.board.dto.request.CreateBoardRequest;
import com.starters.board.board.dto.response.GetBoardResponse;
import com.starters.board.board.service.BoardService;
import com.starters.board.common.auth.dto.UserPrincipal;
import com.starters.board.user.constant.Role;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
class BoardController {

  private final BoardService boardService;

  public BoardController(BoardService boardService) {
    this.boardService = boardService;
  }

  @PostMapping("/boards")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Secured(Role.ADMIN_ROLE)
  public void createBoard(
      @AuthenticationPrincipal UserPrincipal user,
      @Validated @RequestBody CreateBoardRequest request) {
    boardService.createBoard(user.id(), request);
  }

  @GetMapping("/boards")
  @ResponseStatus(HttpStatus.OK)
  public List<GetBoardResponse> getBoards() {
    return boardService.getBoards();
  }
}
