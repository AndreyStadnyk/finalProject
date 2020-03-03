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
import ua.com.danit.entity.Comment;
import ua.com.danit.service.CommentService;

import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
  private CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping("/{postId}")
  public ResponseEntity<Comment> createComment(@PathVariable String postId, @RequestBody Comment comment) {
    Comment resComment = commentService.createComment(Long.parseLong(postId), comment.getText());
    return ResponseEntity.ok(resComment);
  }

  @PutMapping("/{commentId}")
  public ResponseEntity<Comment> updateComment(@PathVariable String commentId, @RequestBody Comment comment) {
    Comment resComment = commentService.updateComment(Long.parseLong(commentId), comment.getText());
    return ResponseEntity.ok(resComment);
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<Comment> deleteComment(@PathVariable String commentId) {
    Comment resComment = commentService.deleteComment(Long.parseLong(commentId));
    return ResponseEntity.ok(resComment);
  }
}
