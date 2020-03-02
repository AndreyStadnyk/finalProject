package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import ua.com.danit.entity.Comment;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.User;
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
  // TODO Add parameter @RequestBody CommentRequest commentRequest
  public ResponseEntity<Comment> addComment(@PathVariable String postId) {
    Post post = new Post();
    post.setId(Long.parseLong(postId));
    User author = new User(); // TODO Get current user

    Comment comment = new Comment();
    comment.setPost(post);
    comment.setAuthor(author);
    comment.setText("Lorem ipsum"); // TODO commentRequest.getText()

    commentService.addComment(comment);
    return ResponseEntity.ok(comment);
  }

  @PutMapping("/{commentId}")
  // TODO Add parameter @RequestBody CommentRequest commentRequest
  public ResponseEntity<Comment> updateComment(@PathVariable String commentId) {
    Comment comment = new Comment();
    comment.setId(Long.parseLong(commentId));
    comment.setText("Lorem ipsum"); // TODO commentRequest.getText()

    commentService.updateComment(comment);
    return ResponseEntity.ok(comment);
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<Comment> deleteComment(@PathVariable String commentId) {
    Comment comment = new Comment();
    comment.setId(Long.parseLong(commentId));

    commentService.deleteComment(comment);
    return ResponseEntity.ok(comment);
  }
}
