package ua.com.danit.mapping;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.request.CommentRequest;
import ua.com.danit.dto.response.CommentResponse;
import ua.com.danit.entity.Comment;
import ua.com.danit.service.CommentService;

@Component
public class CommentMapper {
  private CommentService commentService;
  private ModelMapper modelMapper;

  @Autowired
  public CommentMapper(CommentService commentService, ModelMapper modelMapper) {
    this.commentService = commentService;
    this.modelMapper = modelMapper;
  }

  public CommentResponse create(CommentRequest commentRequest) {
    Comment comment = modelMapper.map(commentRequest, Comment.class);
    Comment resComment = commentService.createComment(comment);
    return modelMapper.map(resComment, CommentResponse.class);
  }
}
