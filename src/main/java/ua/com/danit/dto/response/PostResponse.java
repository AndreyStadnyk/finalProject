package ua.com.danit.dto.response;

import lombok.Data;
import ua.com.danit.entity.Like;

import java.util.List;

@Data
public class PostResponse {
  private Long id;
  private String ownerUsername;
  private String authorUsername;
  private String date;
  private String text;
  private List<CommentResponse> comments;
  private List<LikeResponse> likes;
}
