package com.starters.board.board.service;

import com.starters.board.board.dto.request.CreateBoardRequest;
import com.starters.board.board.dto.response.GetBoardResponse;
import com.starters.board.board.model.Board;
import com.starters.board.board.repository.BoardRepository;
import com.starters.board.board.util.BoardMapper;
import com.starters.board.user.model.User;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class BoardService {

  private final BoardRepository boardRepository;
  private final BoardMapper boardMapper;

  public BoardService(BoardRepository boardRepository, BoardMapper boardMapper) {
    this.boardRepository = boardRepository;
    this.boardMapper = boardMapper;
  }

  @Transactional
  public void createBoard(String userId, CreateBoardRequest request) {
    User user = User.reference(userId);

    Board board =
        Board.builder()
            .creator(user)
            .icon(request.icon())
            .title(request.title())
            .description(request.description())
            .build();
    board = boardRepository.save(board);

    log.info("Board {} created with ID {}", board.getTitle(), board.getId());
  }

  @Transactional(readOnly = true)
  public List<GetBoardResponse> getBoards() {
    return boardMapper.toGetBoardResponses(boardRepository.findAll());
  }
}
