package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Comment;
import ua.com.danit.repository.CommentRepository;

@Service
public class CommentService {
  private CommentRepository commentRepository;

  @Autowired
  public CommentService(CommentRepository commentRepository) {
    this.commentRepository = commentRepository;
  }

  public void addComment(Comment comment) {
    commentRepository.save(comment);
  }

  public void updateComment(Comment comment) {
    commentRepository.save(comment);
  }

  public void deleteComment(Comment comment) {
    commentRepository.delete(comment);
  }
}
