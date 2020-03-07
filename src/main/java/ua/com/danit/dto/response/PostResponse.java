package ua.com.danit.dto.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PostResponse {

  private Long id;
  private String ownerUsername;
  private String authorUsername;
  private String date;
  private String text;
  private List<CommentResponse> comments;

  public PostResponse() {
    this.comments = new ArrayList<>();
  }

  public void addComment(CommentResponse commentResponse) {
    comments.add(commentResponse);
  }

}
