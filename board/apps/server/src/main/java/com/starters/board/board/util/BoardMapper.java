package com.starters.board.board.util;

import com.starters.board.board.dto.response.GetBoardResponse;
import com.starters.board.board.model.Board;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {

  public List<GetBoardResponse> toGetBoardResponses(List<Board> boards);
}
