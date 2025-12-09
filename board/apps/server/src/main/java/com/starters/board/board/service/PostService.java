package com.starters.board.board.service;

import com.starters.board.board.dto.request.CreatePostRequest;
import com.starters.board.board.dto.request.UpdatePostRequest;
import com.starters.board.board.dto.response.GetPostResponse;
import com.starters.board.board.model.Board;
import com.starters.board.board.model.Post;
import com.starters.board.board.repository.PostRepository;
import com.starters.board.board.util.PostMapper;
import com.starters.board.user.model.User;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {

  private final PostRepository postRepository;
  private final PostMapper postMapper;

  public PostService(PostRepository postRepository, PostMapper postMapper) {
    this.postRepository = postRepository;
    this.postMapper = postMapper;
  }

  @Transactional
  public void createPost(String authorId, CreatePostRequest request) {
    User author = User.reference(authorId);
    Board board = Board.reference(request.boardId());

    Post post =
        Post.builder()
            .author(author)
            .board(board)
            .title(request.title())
            .content(request.content())
            .isPublic(request.isPublic())
            .isCommentingAllowed(request.isCommentingAllowed())
            .build();

    postRepository.save(post);
  }

  @Transactional(readOnly = true)
  public GetPostResponse getPost(Long postId) {
    Post post = postRepository.findById(postId).orElseThrow();
    return postMapper.toGetPostResponse(post);
  }

  @Transactional(readOnly = true)
  public Page<GetPostResponse> getPosts(
      @Nullable Long boardId, int size, int page, @Nullable String query) {
    Pageable pageable = Pageable.ofSize(size).withPage(page);

    if (boardId == null) {
      throw new UnsupportedOperationException("Fetching all posts is not supported yet.");
    }

    return postRepository.findByBoardId(boardId, pageable).map(postMapper::toGetPostResponse);
  }

  @Transactional
  public void updatePost(Long postId, UpdatePostRequest request) {
    Post post = postRepository.findById(postId).orElseThrow();

    if (request.title() != null) {
      post.setTitle(request.title());
    }
    if (request.content() != null) {
      post.setContent(request.content());
    }
    if (request.isPublic() != null) {
      post.setIsPublic(request.isPublic());
    }
    if (request.isCommentingAllowed() != null) {
      post.setIsCommentingAllowed(request.isCommentingAllowed());
    }

    postRepository.save(post);
  }

  @Transactional
  public void deletePost(Long postId) {
    postRepository.deleteById(postId);
  }
}
