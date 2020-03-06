package ua.com.danit.mapping;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.request.CommentRequest;
import ua.com.danit.dto.response.CommentResponse;
import ua.com.danit.entity.Comment;
import ua.com.danit.service.CommentService;

import javax.annotation.PostConstruct;
import java.util.Objects;

@Component
public class CommentMapper extends AbstractMapper<Comment, CommentResponse> {
  private final CommentService commentService;
  private final ModelMapper modelMapper;

  @Autowired
  public CommentMapper(CommentService commentService, ModelMapper modelMapper) {
    super(Comment.class, CommentResponse.class);
    this.commentService = commentService;
    this.modelMapper = modelMapper;
  }

  @PostConstruct
  public void setupMapper() {
    mapper.createTypeMap(Comment.class, CommentResponse.class)
        .addMappings(m -> m.skip(CommentResponse::setId)).setPostConverter(toDtoConverter());
  }

  @Override
  public void mapSpecificFields(Comment source, CommentResponse destination) {
    destination.setId(getId(source));
  }

  private Long getId(Comment source) {
    return Objects.isNull(source) || Objects.isNull(source.getId()) ? null : source.getId();
  }

  public CommentResponse create(CommentRequest commentRequest, Long postId) {
    Comment comment = modelMapper.map(commentRequest, Comment.class);
    Comment resComment = commentService.createComment(comment, postId);
    return modelMapper.map(resComment, CommentResponse.class);
  }

  public CommentResponse update(CommentRequest commentRequest, Long commentId) throws Exception {
    Comment comment = modelMapper.map(commentRequest, Comment.class);
    Comment resComment = commentService.updateComment(commentId, comment.getText());
    return modelMapper.map(resComment, CommentResponse.class);
  }

  public CommentResponse delete(Long commentId) throws Exception {
    Comment resComment = commentService.deleteComment(commentId);
    return modelMapper.map(resComment, CommentResponse.class);
  }
}
