package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.danit.dto.request.PostRequest;
import ua.com.danit.dto.response.PostResponse;
import ua.com.danit.mapping.PostMapper;

@RestController
@RequestMapping("/api/posts")
public class PostsController {


  private PostMapper postMapper;

  @Autowired
  public PostsController(PostMapper postMapper) {
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
  public ResponseEntity<PostResponse> delete(@PathVariable long postId) {
    return ResponseEntity.ok(postMapper.delete(postId));
  }

//  @GetMapping
//  public ResponseEntity<List<PostResponse>> getAllPosts() {
//    return ResponseEntity.ok(postMapper.getAllPostsForCurrentUser());
//  }

  @GetMapping
  public ResponseEntity<Page<PostResponse>> getAllPosts(@PageableDefault Pageable pageable) {
    return ResponseEntity.ok(postMapper.findPosts(pageable));
  }


  @PostMapping("/{postId}/likes")
  public ResponseEntity<PostResponse> removeOrAddLike(@PathVariable long postId) {
    return ResponseEntity.ok(postMapper.removeOrAddLikeByPostId(postId));
  }

}
