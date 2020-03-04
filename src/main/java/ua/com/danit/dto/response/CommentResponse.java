package ua.com.danit.dto.response;

import lombok.Data;

@Data
public class CommentResponse {
  public long id;
  public String text;
  public long post;
  public long author;
}
