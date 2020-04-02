package ua.com.danit.dto.response;

import lombok.Data;

@Data
public class LikeResponse {
  public Long id;
  public String userUsername;
  public Long postId;
}
