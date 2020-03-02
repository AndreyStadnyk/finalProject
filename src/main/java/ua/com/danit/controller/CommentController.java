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

@RestController
@RequestMapping("/api/comments")
public class CommentController {
  private CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping("/{postId}")
  public ResponseEntity<Comment> addComment(@PathVariable String postId, @RequestBody Comment comment) {
    commentService.addComment(Long.parseLong(postId), comment.getText());
    return ResponseEntity.ok(comment);
  }

  @PutMapping("/{commentId}")
  public ResponseEntity<Comment> updateComment(@PathVariable String commentId, @RequestBody Comment comment) {
    commentService.updateComment(Long.parseLong(commentId), comment.getText());
    return ResponseEntity.ok(comment);
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<Comment> deleteComment(@PathVariable String commentId) {
    commentService.deleteComment(Long.parseLong(commentId));
    return ResponseEntity.ok(new Comment());
  }
}
