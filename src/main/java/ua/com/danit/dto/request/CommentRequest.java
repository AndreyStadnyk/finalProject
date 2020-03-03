package ua.com.danit.dto.request;

import lombok.Data;

@Data
public class CommentRequest {
  public long id;
  public String text;
  public long post;
  public long author;
}
