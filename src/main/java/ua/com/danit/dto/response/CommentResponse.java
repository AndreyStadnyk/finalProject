package ua.com.danit.dto.response;

import lombok.Data;

@Data
public class CommentResponse {

  public Long id;
  public String text;
  public Long postId;
  public String authorUsername;

}
