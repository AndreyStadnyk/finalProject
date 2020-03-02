package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Comment;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.User;
import ua.com.danit.repository.CommentRepository;

@Service
public class CommentService {
  private CommentRepository commentRepository;
  private UserService userService;

  @Autowired
  public CommentService(CommentRepository commentRepository, UserService userService) {
    this.commentRepository = commentRepository;
    this.userService = userService;
  }

  public Comment findCommentById(Long commentId) {
    return commentRepository.findCommentById(commentId);
  }

  public void addComment(Long postId, String text) {
    Post post = new Post(); // TODO Get post by ID
    User author = userService.getCurrentUser();

    Comment comment = new Comment();
    comment.setPost(post);
    comment.setAuthor(author);
    comment.setText(text);

    commentRepository.save(comment);
  }

  public void updateComment(Long commentId, String text) {
    User currentUser = userService.getCurrentUser();
    Comment comment = findCommentById(commentId);

    if (currentUser.equals(comment.getAuthor())) {
      comment.setText(text);
      commentRepository.save(comment);
    }
  }

  public void deleteComment(Long commentId) {
    User currentUser = userService.getCurrentUser();
    Comment comment = findCommentById(commentId);

    if (currentUser.equals(comment.getAuthor())) {
      commentRepository.delete(comment);
    }
  }
}
