package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

  @PostMapping("/{username}")
  public ResponseEntity<PostResponse> create(@PathVariable String username,
                                             @RequestBody PostRequest postRequest) {
    return ResponseEntity.ok(postMapper.create(postRequest));
  }

  @PutMapping("/{postId}")
  public ResponseEntity<PostResponse> update(@PathVariable long postId,
                                             @RequestBody PostRequest postRequest) throws Exception {
    return ResponseEntity.ok(postMapper.update(postRequest));
  }

  @PostMapping("/{postId}")
  public ResponseEntity<PostResponse> delete(@PathVariable long postId,
                                             @RequestBody PostRequest postRequest) throws Exception {
    return ResponseEntity.ok(postMapper.delete(postRequest));
  }

  @GetMapping
  public ResponseEntity<PostResponse> getAllPosts(@RequestBody PostRequest postRequest) {
    return ResponseEntity.ok(postMapper.getAllPostsForCurrentUser(postRequest));
  }

}
