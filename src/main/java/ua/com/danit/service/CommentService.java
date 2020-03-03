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
  private PostService postService;

  @Autowired
  public CommentService(CommentRepository commentRepository, UserService userService, PostService postService) {
    this.commentRepository = commentRepository;
    this.userService = userService;
    this.postService = postService;
  }

  public Optional<Comment> findCommentById(Long commentId) {
    return commentRepository.findById(commentId);
  }

  public Comment createComment(Comment comment) {
    Post post = postService.getCurrentPost();
    User author = userService.getCurrentUser();

    comment.setPost(post);
    comment.setAuthor(author);

    return commentRepository.save(comment);
  }

  public Comment updateComment(Long commentId, String text) throws Exception {
    User currentUser = userService.getCurrentUser();
    Optional<Comment> comment = findCommentById(commentId);
    if (comment.isPresent() && currentUser.equals(comment.get().getAuthor())) {
      comment.get().setText(text);
      return commentRepository.save(comment.get());
    } else {
      throw new Exception();
    }
  }

  public Comment deleteComment(Long commentId) throws Exception {
    User currentUser = userService.getCurrentUser();
    Optional<Comment> comment = findCommentById(commentId);

    if (comment.isPresent() && currentUser.equals(comment.get().getAuthor())) {
      commentRepository.delete(comment.get());
      return comment.get();
    } else {
      throw new Exception();
    }
  }
}