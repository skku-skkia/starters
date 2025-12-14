package com.skkia.board.util;

import com.skkia.board.dto.response.GetBoardResponse;
import com.skkia.board.model.Board;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {

  public List<GetBoardResponse> toGetBoardResponses(List<Board> boards);
}
