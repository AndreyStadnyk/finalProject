package ua.com.danit.dto.response;

import lombok.Data;
import ua.com.danit.dto.AbstractDto;

@Data
public class CommentResponse extends AbstractDto {
  public String text;
  public Long postId;
  //public String author;
}
