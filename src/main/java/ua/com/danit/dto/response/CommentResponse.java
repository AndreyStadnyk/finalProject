package ua.com.danit.dto.response;

import lombok.Data;

@Data
public class CommentResponse {
  public Long id;
  public String text;
  public Long post;
  public String author;
}
