package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import ua.com.danit.dto.request.CommentRequest;
import ua.com.danit.dto.response.CommentResponse;
import ua.com.danit.mapping.CommentMapper;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

  private CommentMapper commentMapper;

  @Autowired
  public CommentController(CommentMapper commentMapper) {
    this.commentMapper = commentMapper;
  }

  @PostMapping("/{postId}")
  public ResponseEntity<CommentResponse> createComment(@PathVariable Long postId,
                                                       @RequestBody CommentRequest commentRequest) {
    return ResponseEntity.ok(commentMapper.create(commentRequest, postId));
  }

  @PutMapping("/{commentId}")
  public ResponseEntity<CommentResponse> updateComment(@PathVariable Long commentId,
                                               @RequestBody CommentRequest commentRequest) throws Exception {
    return ResponseEntity.ok(commentMapper.update(commentRequest, commentId));
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<CommentResponse> deleteComment(@PathVariable Long commentId) throws Exception {
    return ResponseEntity.ok(commentMapper.delete(commentId));
  }

}
