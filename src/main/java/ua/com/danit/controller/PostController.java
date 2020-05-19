package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import ua.com.danit.dto.request.PostRequest;
import ua.com.danit.dto.response.PostResponse;
import ua.com.danit.mapping.PostMapper;

@RestController
@RequestMapping("/api/posts")
public class PostController {

  private PostMapper postMapper;

  @Autowired
  public PostController(PostMapper postMapper) {
    this.postMapper = postMapper;
  }

  @PostMapping("/{ownerUsername}")
  public ResponseEntity<PostResponse> create(@PathVariable String ownerUsername,
                                             @RequestBody PostRequest postRequest) {
    return ResponseEntity.ok(postMapper.create(postRequest, ownerUsername));
  }

  @PutMapping("/{postId}")
  public ResponseEntity<PostResponse> update(@PathVariable Long postId,
                                             @RequestBody PostRequest postRequest) {
    return ResponseEntity.ok(postMapper.update(postRequest, postId));
  }

  @DeleteMapping("/{postId}")
  public ResponseEntity<PostResponse> delete(@PathVariable
                                                   long postId) {
    return ResponseEntity.ok(postMapper.delete(postId));
  }

  @GetMapping
  public ResponseEntity<Page<PostResponse>> getAllPostsForCurrentUserWithPagination(@PageableDefault Pageable pageable) {
    return ResponseEntity.ok(postMapper.getAllPostsForCurrentUserWithPagination(pageable));
  }

  @GetMapping("/{username}")
  public ResponseEntity<Page<PostResponse>> getAllPostsForAnotherUserWithPagination(@PathVariable String username,
                                                                                    @PageableDefault Pageable pageable) {
    return ResponseEntity.ok(postMapper.getAllPostsForAnotherUserWithPagination(username, pageable));
  }

  @GetMapping("/tape")
  public ResponseEntity<Page<PostResponse>> getAllPostsForCurrentUserAndFriendsWithPagination(
      @PageableDefault Pageable pageable) {
    return ResponseEntity.ok(postMapper.getAllPostsForCurrentUserAndFriendsWithPagination(pageable));
  }

  @PostMapping("/{postId}/likes")
  public ResponseEntity<PostResponse> removeOrAddLike(@PathVariable long postId) {
    return ResponseEntity.ok(postMapper.removeOrAddLikeByPostId(postId));
  }

}
