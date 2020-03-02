package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Comment;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.User;
import ua.com.danit.repository.CommentRepository;

import java.util.Optional;

@Service
public class CommentService {
  private CommentRepository commentRepository;
  private UserService userService;

  @Autowired
  public CommentService(CommentRepository commentRepository, UserService userService) {
    this.commentRepository = commentRepository;
    this.userService = userService;
  }

  public Optional<Comment> findCommentById(Long commentId) {
    return commentRepository.findById(commentId);
  }

  public Comment createComment(Long postId, String text) {
    Post post = new Post(); // TODO Get post by ID
    User author = userService.getCurrentUser();

    Comment comment = new Comment();
    comment.setPost(post);
    comment.setAuthor(author);
    comment.setText(text);

    return commentRepository.save(comment);
  }

  public Optional<Comment> updateComment(Long commentId, String text) {
    User currentUser = userService.getCurrentUser();
    Optional<Comment> comment = findCommentById(commentId);
    if (comment.isPresent() && currentUser.equals(comment.get().getAuthor())) {
      comment.get().setText(text);
      return Optional.of(commentRepository.save(comment.get()));
    } else {
      return Optional.empty();
    }
  }

  public Optional<Comment> deleteComment(Long commentId) {
    User currentUser = userService.getCurrentUser();
    Optional<Comment> comment = findCommentById(commentId);

    if (comment.isPresent() && currentUser.equals(comment.get().getAuthor())) {
      commentRepository.delete(comment.get());
      return comment;
    } else {
      return Optional.empty();
    }
  }
}
